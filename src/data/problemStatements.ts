export interface ProblemStatement {
  id: string;
  title: string;
  category: string;
  problem: string;
  challenge: string;
}

export const problemStatements: ProblemStatement[] = [
  {
    id: "IF26-01",
    title: "AI-Powered Early Warning System for Public Health",
    category: "Healthcare & Pharma",
    problem: "Healthcare systems often struggle to identify early signs of disease outbreaks and emerging health risks from scattered and delayed information. Community-level signals such as symptoms, local health reports, environmental conditions, and public data are rarely combined into one actionable view.",
    challenge: `Build an AI-powered platform that can analyze multiple sources of health-related information and identify potential outbreak patterns or emerging public-health risks at an early stage.

The solution should help authorities or healthcare organizations understand:

- where a potential risk is emerging
- what patterns are being detected
- how severe the situation may be
- which areas may require attention

The system should prioritize explainability, privacy, and responsible use of health data.`,
  },
  {
    id: "IF26-02",
    title: "Intelligent Financial Safety Platform for Students",
    category: "Fintech",
    problem: "Students increasingly use digital payments, online banking, UPI, subscriptions, and financial services, but many lack the tools and awareness needed to identify suspicious transactions, scams, hidden spending patterns, and poor financial habits.",
    challenge: `Design an intelligent financial safety platform that helps students understand their spending behavior and identify potentially suspicious or risky financial activity.

The solution could provide:

- spending insights
- unusual transaction detection
- scam/fraud awareness
- subscription tracking
- budgeting assistance
- personalized financial education

The platform should prioritize privacy and should never encourage unsafe financial decisions.`,
  },
  {
    id: "IF26-03",
    title: "Smart Waste Management for Growing Communities",
    category: "Sustainability & Smart Solutions",
    problem: "Waste collection and segregation systems in rapidly growing communities are often inefficient. Collection schedules may not match actual waste generation, overflowing bins can go unnoticed, and recyclable material is frequently mixed with general waste.",
    challenge: `Build a smart waste-management solution that can improve waste collection, segregation, monitoring, and resource utilization.

The solution may use:

- IoT sensors
- computer vision
- route optimization
- predictive analytics
- citizen reporting
- data dashboards

The goal is to reduce unnecessary collection trips, improve cleanliness, increase recycling, and make waste-management operations more efficient.`,
  },
  {
    id: "IF26-04",
    title: "AI-Assisted Crop Health & Advisory Platform",
    category: "Agritech",
    problem: "Farmers often have limited access to timely information about crop health, soil conditions, weather risks, pests, and suitable agricultural practices. Delayed decisions can lead to reduced productivity and unnecessary use of water, fertilizers, and pesticides.",
    challenge: `Develop an accessible technology platform that can help farmers identify crop-health issues and receive useful, understandable recommendations.

The solution may combine:

- satellite imagery
- computer vision
- weather information
- soil data
- crop information
- AI-based recommendations

The system should be designed for practical field use, including users with limited technical literacy.`,
  },
  {
    id: "IF26-05",
    title: "Accessible Digital Services for Everyone",
    category: "Social Innovation",
    problem: "Many essential digital services are difficult to access for people who face language barriers, limited digital literacy, disabilities, or unreliable internet connectivity.\n\nImportant information may technically be available online but still remain inaccessible to the people who need it most.",
    challenge: `Create an inclusive digital platform that makes essential information or services easier to discover and use.

Consider:

- multilingual interfaces
- voice-based interaction
- accessibility features
- low-bandwidth experiences
- simple navigation
- assisted workflows

The solution should focus on real usability rather than simply adding more features.`,
  },
  {
    id: "IF26-06",
    title: "AI-Powered Urban Mobility & Traffic Intelligence",
    category: "Smart Solutions",
    problem: "Urban traffic patterns are constantly changing due to congestion, road conditions, public events, weather, accidents, and changing travel behavior. Conventional traffic systems often react after congestion has already developed.",
    challenge: `Build an intelligent mobility platform that can analyze transportation data and help predict or manage congestion.

Possible areas include:

- traffic prediction
- route optimization
- public transport coordination
- incident detection
- parking intelligence
- emergency vehicle routing

The goal is to make urban transportation safer, faster, and more efficient.`,
  },
  {
    id: "IF26-07",
    title: "Climate & Disaster Preparedness Intelligence Platform",
    category: "Sustainability & Emerging Technology",
    problem: "Communities vulnerable to floods, landslides, extreme weather, and other environmental hazards often lack localized, timely, and easy-to-understand information for preparedness and response.",
    challenge: `Develop an intelligent platform that can combine environmental and location-based information to help communities understand potential risks and prepare for emergencies.

The solution may explore:

- weather data
- satellite imagery
- geographic information
- historical events
- risk mapping
- early warnings
- community reporting

The platform should communicate risk clearly and avoid unnecessary panic or misleading predictions.`,
  }
];
