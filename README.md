<div align="center">
  <h1>🚀 LMI-CAP Platform</h1>
  <p><b>Labour Market Information & Career Action Plan Platform</b></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-18.3.1-61DAFB.svg?style=for-the-badge&logo=React" alt="React">
    <img src="https://img.shields.io/badge/Vite-6.0.7-646CFF.svg?style=for-the-badge&logo=Vite" alt="Vite">
    <img src="https://img.shields.io/badge/TypeScript-5.7.2-3178C6.svg?style=for-the-badge&logo=TypeScript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  </p>

  <h3><a href="https://lmi-cap.netlify.app/">🌐 View Live Application</a></h3>
</div>

---

## 📖 About The Project

The **LMI-CAP (Labour Market Information - Career Action Plan) Platform** is a unified, intelligent ecosystem designed to bridge the gap between industry demands, policy-making, and job seekers. 

By ingesting real-time market signals and providing multi-tenant portals, the platform aligns curriculum frameworks (e.g., NSQF levels) with actual industry needs, empowering governance bodies with actionable telemetry and candidates with personalized career trajectories.

## 🌟 Key Features

*   **🏭 Industry Portal:** Real-time job requisition drafting, skill gap identification, curriculum diffing, and market telemetry scraping.
*   **🏛️ Governance Portal:** Macro-level monitoring of skill trends, real-time syllabus validation, and policy alignment.
*   **🎓 Candidate Portal:** Personalized Career Action Plans, skill diagnostic tools, and AI-driven job matching.
*   **📡 Live Telemetry Engine:** Ingests market signals from multiple scraped feeds (e.g., Naukri, LinkedIn, Employment Exchanges).

## 🏗️ Abstract Workflow Diagram

The following architecture diagram illustrates the flow of data from ingestion through the central LMI engine, routing to our multi-tenant portals, and establishing a continuous feedback loop.

```mermaid
flowchart TB
    %% Themes and Styling
    classDef core fill:#1e293b,stroke:#38bdf8,stroke-width:4px,color:#fff,rx:10,ry:10
    classDef portal fill:#0f172a,stroke:#818cf8,stroke-width:2px,color:#fff
    classDef module fill:#334155,stroke:#94a3b8,stroke-width:1px,color:#fff
    classDef data fill:#0284c7,stroke:#fff,stroke-width:2px,color:#fff,rx:5,ry:5

    subgraph DataIngestion ["📡 Real-time Data Ingestion"]
        direction LR
        JS[Job Scrapers]:::data
        MS[Market Signals]:::data
        IT[Industry Telemetry]:::data
    end

    DataIngestion --> Engine

    Engine{{"⚙️ Central LMI Engine"}}:::core

    Engine ===> |"Unified Analytics & Insights"| Portals

    subgraph Portals ["🎯 Multi-Tenant Portals"]
        direction TB
        
        subgraph Industry ["🏭 Industry Portal"]
            direction TB
            I1[Demand Forecasting]:::module
            I2[Curriculum Alignment]:::module
            I3[Job Requisitions]:::module
        end

        subgraph Governance ["🏛️ Governance Portal"]
            direction TB
            G1[Policy Decisions]:::module
            G2[Skill Gap Monitoring]:::module
            G3[Resource Validation]:::module
        end

        subgraph Candidate ["🎓 Candidate Portal"]
            direction TB
            C1[Career Action Plans]:::module
            C2[Skill Diagnostics]:::module
            C3[Job Matching]:::module
        end
    end

    Industry <--> |"Industry Feedback"| Engine
    Governance <--> |"Regulatory Updates"| Engine
    Candidate <--> |"Skill Progression"| Engine
```

## 🚀 Live Application

The LMI-CAP Platform is fully deployed and accessible online.

**🔗 [Access the Live Portal Here: lmi-cap.netlify.app](https://lmi-cap.netlify.app/)**

## 🛠️ Tech Stack

*   **Frontend Framework:** React 18 with Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, `clsx`, `tailwind-merge`
*   **Icons:** Lucide React

## 🔮 Future Features

We are actively expanding the capabilities of the LMI-CAP platform. Here are some of the features on our roadmap:

*   **Advanced AI Skill Matching:** Deep learning models to predict seamless career transitions and recommend upskilling paths.
*   **Blockchain Credentialing:** Immutable and verifiable digital certificates for candidate skill achievements.
*   **Automated Policy Drafting:** GenAI-assisted drafting of skill policies for governance bodies based on real-time data.
*   **Multilingual Support:** Comprehensive accessibility across multiple regional languages for wider reach.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request or open an issue if you have suggestions for improvements.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
<div align="center">
  <i>Built with ❤️ for the future of workforce planning.</i>
</div>
