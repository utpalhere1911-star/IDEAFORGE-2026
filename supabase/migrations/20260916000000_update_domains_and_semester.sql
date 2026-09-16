-- 1. Safely add semester column to members
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'semester'
    ) THEN
        ALTER TABLE members ADD COLUMN semester text;
    END IF;
END $$;

-- 2. Safely add description column to problem_statements
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'problem_statements' AND column_name = 'description'
    ) THEN
        ALTER TABLE problem_statements ADD COLUMN description text;
    END IF;
END $$;

-- 3. Deactivate all existing problem statements first to ensure obsolete ones don't show
UPDATE problem_statements SET active = false;

-- 4. Upsert the 12 official domains
-- This uses ON CONFLICT (title) to safely update existing rows and preserve their IDs if they already exist
-- For new rows, we supply gen_random_uuid() for safety just in case the ID column lacks a default
INSERT INTO problem_statements (id, title, description, active) VALUES
(gen_random_uuid(), 'AI & Intelligent Systems', 'Artificial intelligence, machine learning, generative AI, automation, computer vision, NLP, autonomous systems.', true),
(gen_random_uuid(), 'IoT, Robotics & Smart Technology', 'Connected devices, sensors, robotics, embedded systems, smart homes, smart campuses, industrial automation.', true),
(gen_random_uuid(), 'HealthTech & Life Sciences', 'Healthcare, pharmaceuticals, biotechnology, diagnostics, medical devices, digital health, preventive care.', true),
(gen_random_uuid(), 'FinTech & Digital Commerce', 'Digital payments, financial inclusion, banking, insurance, commerce, fraud prevention, financial management.', true),
(gen_random_uuid(), 'EdTech & Future of Learning', 'Education, personalized learning, skill development, accessibility in education, assessment, student productivity.', true),
(gen_random_uuid(), 'Climate, Sustainability & CleanTech', 'Renewable energy, waste management, water, pollution, sustainable materials, climate resilience, circular economy.', true),
(gen_random_uuid(), 'AgriTech & Food Innovation', 'Precision agriculture, irrigation, food technology, supply chains, farm productivity, food security.', true),
(gen_random_uuid(), 'Mobility, Smart Cities & Infrastructure', 'Transportation, traffic, public infrastructure, logistics, accessibility, urban planning, smart-city solutions.', true),
(gen_random_uuid(), 'Cybersecurity & Digital Trust', 'Privacy, cybersecurity, identity, secure systems, misinformation detection, digital safety.', true),
(gen_random_uuid(), 'Social Innovation & Accessibility', 'Solutions for communities, inclusion, assistive technology, elderly care, disability, public welfare and social challenges.', true),
(gen_random_uuid(), 'Entrepreneurship & Digital Business', 'New business models, creator economy, marketplaces, productivity platforms, MSME solutions, local businesses.', true),
(gen_random_uuid(), 'OPEN INNOVATION', E'No boundaries. No predefined box.\n\nHave an idea that doesn''t fit into any of the domains above? Forge it anyway.', true)
ON CONFLICT (title) DO UPDATE 
SET description = EXCLUDED.description,
    active = EXCLUDED.active,
    updated_at = NOW();
