import React, { useState } from 'react';
import {
  Terminal,
  Sparkles,
  Code,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  X,
  RotateCcw,
  Check,
  Building2,
  FileCode,
  Award,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  GraduationCap
} from 'lucide-react';

type RoadmapType = 'career' | 'skill';
type NodeStatus = 'todo' | 'learning' | 'done' | 'skipped';

interface CareerRoleCard {
  id: string;
  title: string;
  badge: string;
  salary: string;
  openings: string;
  corridor: string;
  description: string;
  icon: React.ReactNode;
}

interface SkillTrackCard {
  id: string;
  title: string;
  labs: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
}

interface CourseModalData {
  title: string;
  udemyTitle: string;
  udemyDesc: string;
  udemyUrl: string;
  gfgTitle: string;
  gfgDesc: string;
  gfgUrl: string;
  syllabusRef: string;
}

// -----------------------------------------------------------------------------
// 1. DYNAMIC DATA STRUCTURE FOR THE 4 CAREER ROLES (CAREER_PROFILES)
// -----------------------------------------------------------------------------

interface CareerCompany {
  name: string;
  role: string;
  pkg: string;
  loc: string;
}

interface CareerProfile {
  id: string;
  title: string;
  badge: string;
  salary: string;
  openings: string;
  corridor: string;
  description: string;
  demandBadge: string;
  targetOffer: string;
  p1: {
    title: string;
    cutoff: string;
    description: string;
    diagnosticScore: string;
  };
  p2: {
    title: string;
    description: string;
    syllabusRef: string;
    udemyTrack: string;
    udemyDesc: string;
    gfgTrack: string;
    gfgDesc: string;
  };
  p3: {
    title: string;
    description: string;
    warning: string;
    starterTemplate: string;
  };
  p4: {
    title: string;
    description: string;
    mentor: string;
    slot: string;
  };
  p5: {
    title: string;
    description: string;
    buttonText: string;
    companies: CareerCompany[];
  };
}

const CAREER_ROLES: CareerRoleCard[] = [
  {
    id: 'devops',
    title: 'Cloud DevOps & SRE Architect',
    badge: 'Regional High-Demand',
    salary: '₹8.5 - 14 LPA',
    openings: '380 Openings',
    corridor: 'Chennai OMR Corridor',
    description: 'Design container runtimes, Kubernetes cluster topology, and automated GitOps continuous deployment.',
    icon: <Terminal className="w-5 h-5 text-indigo-500" />
  },
  {
    id: 'genai',
    title: 'Applied GenAI & Agents Specialist',
    badge: 'Emerging Premium',
    salary: '₹9.0 - 16 LPA',
    openings: '210 Openings',
    corridor: 'Guindy AI Tech Corridor',
    description: 'Architect autonomous multi-agent pipelines, high-dimensional vector search, and fine-tuned LLM services.',
    icon: <Sparkles className="w-5 h-5 text-purple-500" />
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Microservices Developer',
    badge: 'Core Requisition',
    salary: '₹7.5 - 12 LPA',
    openings: '450 Openings',
    corridor: 'TIDEL IT Corridor',
    description: 'Develop decoupled responsive React frontends with high-concurrency asynchronous Python & Redis backends.',
    icon: <Code className="w-5 h-5 text-emerald-500" />
  },
  {
    id: 'iot',
    title: 'Industrial Automation & Edge IoT Engineer',
    badge: 'Manufacturing Hub',
    salary: '₹7.0 - 11.5 LPA',
    openings: '190 Openings',
    corridor: 'Sriperumbudur Auto Corridor',
    description: 'Deploy industrial PLC controllers, MQTT telemetry daemons, and SCADA monitoring pipelines.',
    icon: <Cpu className="w-5 h-5 text-amber-500" />
  }
];

const CAREER_PROFILES: Record<string, CareerProfile> = {
  devops: {
    id: 'devops',
    title: 'Cloud DevOps & SRE Architect',
    badge: 'Regional High-Demand',
    salary: '₹8.5 - 14 LPA',
    openings: '380 Openings',
    corridor: 'Chennai OMR Corridor',
    description: 'Design container runtimes, Kubernetes cluster topology, and automated GitOps continuous deployment.',
    demandBadge: 'Critical Regional Demand',
    targetOffer: '₹8.5 - 14 LPA Target Offer',
    p1: {
      title: 'Systems Logic, Linux Shell & Network Routing Screening',
      cutoff: 'Requires ≥65% Score',
      description: 'Company-mandated systems logic, Linux shell syntax, and IP routing diagnostic cutoff.',
      diagnosticScore: '65% (Cleared)'
    },
    p2: {
      title: 'Modern Web APIs & Containerization Foundations',
      description: 'Master core subjects: Modern Web APIs (FastAPI), Docker Runtimes, and Applied Linux Shell. Curated catalog with verified platforms.',
      syllabusRef: 'AICTE Model Curriculum: CS3601 Gazette Module Sync',
      udemyTrack: 'Docker, Kubernetes & Production GitOps Masterclass',
      udemyDesc: 'Hands-on production container runtimes and Kubernetes cluster topology with GitOps delivery.',
      gfgTrack: 'Linux System Administration, Bash Scripting & Networking',
      gfgDesc: 'Shell scripting, cron automation, permissions, and network socket triage.'
    },
    p3: {
      title: 'Multi-Container Automated CI/CD Pipeline with GitHub Actions & K8s Ingress',
      description: 'Deploy a containerized microservices backend with automated GitHub Actions CI/CD and ingress controller routing.',
      warning: '⚠ Replaces generic tutorial clones with production telemetry',
      starterTemplate: 'https://github.com/omr-cluster/microservices-pipeline-live'
    },
    p4: {
      title: '1-on-1 Distributed Systems & High-Availability Failover Screening',
      description: '1-on-1 proctored technical interview simulating distributed scaling, fault tolerance, and live whiteboard triage.',
      mentor: 'Senthil K. (Senior Staff Platform Architect, Zoho)',
      slot: 'Thursday, 5:30 PM - 6:15 PM (Google Meet)'
    },
    p5: {
      title: 'Direct Clearance to 18 OMR Cloud Consortium Companies (CloudZero, RedHat Partners)',
      description: 'Verified candidate profiles fast-tracked to 18 active cluster employers in Chennai OMR & Coimbatore TIDEL.',
      buttonText: 'View 18 Eligible Hiring Companies →',
      companies: [
        { name: 'CloudZero Networks', role: 'Junior Cloud DevOps Engineer', pkg: '₹8.5 - 11.0 LPA', loc: 'Chennai OMR Industrial Corridor' },
        { name: 'Zoho Corporation', role: 'Cloud Infrastructure Associate', pkg: '₹9.5 - 13.0 LPA', loc: 'Chennai (OMR) & Tenkasi' },
        { name: 'Freshworks Inc.', role: 'Platform Reliability Engineer', pkg: '₹10.0 - 14.0 LPA', loc: 'Chennai OMR Tech Corridor' },
        { name: 'RedHat Ecosystem Partners', role: 'Kubernetes Cluster Deployer', pkg: '₹8.5 - 12.0 LPA', loc: 'Chennai OMR Hub' }
      ]
    }
  },

  genai: {
    id: 'genai',
    title: 'Applied GenAI & Agents Specialist',
    badge: 'Emerging Premium',
    salary: '₹9.0 - 16 LPA',
    openings: '210 Openings',
    corridor: 'Guindy AI Tech Corridor',
    description: 'Architect autonomous multi-agent pipelines, high-dimensional vector search, and fine-tuned LLM services.',
    demandBadge: 'Emerging AI Specialization',
    targetOffer: '₹9.0 - 16 LPA Target Offer',
    p1: {
      title: 'Linear Algebra, Probabilistic Inference & Algorithmic Logic',
      cutoff: 'Requires ≥70% Score',
      description: 'Company-mandated linear algebra, vector projections, and probabilistic reasoning diagnostic cutoff.',
      diagnosticScore: '72% (Cleared)'
    },
    p2: {
      title: 'Vector Search, Embeddings & Large Language Models',
      description: 'Master core subjects: High-dimensional embeddings, semantic chunking, and generative agent architectures.',
      syllabusRef: 'AICTE AI Model: CS4702 Frontier Agents Sync',
      udemyTrack: 'Building Production Multi-Agent Systems & LangGraph Architectures',
      udemyDesc: 'End-to-end multi-agent orchestration, state graphs, tool-calling pipelines, and autonomous workflows.',
      gfgTrack: 'Vector Databases, HNSW Indexing & Semantic Search Fundamentals',
      gfgDesc: 'Hierarchical Navigable Small World graphs, dense embeddings, and cosine similarity lookup.'
    },
    p3: {
      title: 'Production Multi-Agent RAG Engine with Qdrant Vector Store & Chunk Ingestion',
      description: 'Deploy an end-to-end autonomous RAG pipeline with hybrid vector indexing, citation verification, and LangGraph flow control.',
      warning: '⚠ Replaces simple ChatGPT wrapper clones with production hybrid vector telemetry',
      starterTemplate: 'https://github.com/omr-cluster/genai-rag-autonomous-agent'
    },
    p4: {
      title: 'System Design for Context Windows, Token Streaming & Guardrails',
      description: '1-on-1 technical interview evaluating hallucination mitigation, token throughput, streaming latency, and agent memory state.',
      mentor: 'Dr. Ananya Raman (Principal AI Scientist, TensorWorks)',
      slot: 'Friday, 4:00 PM - 4:45 PM (Google Meet)'
    },
    p5: {
      title: 'Direct Clearance to 12 AI & Frontier Intelligence Startups (TensorWorks, CogniLabs)',
      description: 'Verified candidate profiles fast-tracked to 12 frontier AI labs and generative agent consortium partners in Guindy & OMR.',
      buttonText: 'View 12 Eligible AI Hiring Companies →',
      companies: [
        { name: 'TensorWorks AI', role: 'Autonomous Agent Engineer', pkg: '₹11.0 - 16.0 LPA', loc: 'Guindy AI Tech Corridor' },
        { name: 'CogniLabs Frontier Systems', role: 'LLM Systems Developer', pkg: '₹9.5 - 14.5 LPA', loc: 'Chennai Urban AI Hub' },
        { name: 'LatentView Analytics', role: 'GenAI Solutions Specialist', pkg: '₹9.0 - 13.5 LPA', loc: 'Chennai OMR Corridor' },
        { name: 'Vernacular AI Labs', role: 'Vector Pipeline & Speech Architect', pkg: '₹10.0 - 15.0 LPA', loc: 'Guindy Tech Park' }
      ]
    }
  },

  fullstack: {
    id: 'fullstack',
    title: 'Full-Stack Microservices Developer',
    badge: 'Core Requisition',
    salary: '₹7.5 - 12 LPA',
    openings: '450 Openings',
    corridor: 'TIDEL IT Corridor',
    description: 'Develop decoupled responsive React frontends with high-concurrency asynchronous Python & Redis backends.',
    demandBadge: 'High Volume Requisition',
    targetOffer: '₹7.5 - 12 LPA Target Offer',
    p1: {
      title: 'Data Structures, Dynamic Programming & Async Concurrency Logic',
      cutoff: 'Requires ≥65% Score',
      description: 'Company-mandated algorithms, asynchronous event loops, and relational modeling diagnostic cutoff.',
      diagnosticScore: '68% (Cleared)'
    },
    p2: {
      title: 'Modern Reactive Frontends & Asynchronous REST Architectures',
      description: 'Master core subjects: React 19 component trees, FastAPI async endpoints, and Redis cache invalidation.',
      syllabusRef: 'AICTE Full-Stack Curriculum: CS3804 Microservices Sync',
      udemyTrack: 'Full-Stack FastAPI, React 19 & Redis Caching Bootcamp',
      udemyDesc: 'Comprehensive decoupled frontend & backend engineering with async SQLAlchemy 2.0 and Redis pub-sub.',
      gfgTrack: 'Microservices Design Patterns, Event-Driven Kafka & Database Indexing',
      gfgDesc: 'Saga pattern, distributed tracing, database sharding, and message broker pipelines.'
    },
    p3: {
      title: 'High-Concurrency Order Processing Microservice with Redis & PostgreSQL',
      description: 'Deploy a decoupled microservices architecture with distributed locking, message queues, and JWT authentication.',
      warning: '⚠ Replaces generic CRUD todo apps with high-throughput concurrent order processing',
      starterTemplate: 'https://github.com/omr-cluster/microservices-pipeline-live'
    },
    p4: {
      title: '1-on-1 Full-Stack Architectural Review: Caching, JWT & API Gateway',
      description: '1-on-1 technical review examining database sharding, N+1 query resolution, and reverse proxy routing.',
      mentor: 'Karthik Raja (Director of Engineering, TIDEL Systems)',
      slot: 'Wednesday, 6:00 PM - 6:45 PM (Google Meet)'
    },
    p5: {
      title: 'Direct Clearance to 22 TIDEL Cluster IT Firms (TIDEL Systems, FinServe Cloud)',
      description: 'Verified candidate profiles fast-tracked to 22 high-growth software and fintech firms across TIDEL park.',
      buttonText: 'View 22 Eligible IT Hiring Companies →',
      companies: [
        { name: 'TIDEL Systems Group', role: 'Microservices Backend Apprentice', pkg: '₹7.5 - 9.2 LPA', loc: 'TIDEL IT Corridor' },
        { name: 'FinServe Cloud Technologies', role: 'Full-Stack React/FastAPI Dev', pkg: '₹8.5 - 12.0 LPA', loc: 'Taramani Tech Zone' },
        { name: 'Aspire Systems', role: 'Distributed Cloud Associate', pkg: '₹7.5 - 10.5 LPA', loc: 'Siruseri IT Corridor' },
        { name: 'Chargebee', role: 'Billing Infrastructure Dev', pkg: '₹9.0 - 13.0 LPA', loc: 'TIDEL Tech Park' }
      ]
    }
  },

  iot: {
    id: 'iot',
    title: 'Industrial Automation & Edge IoT Engineer',
    badge: 'Manufacturing Hub',
    salary: '₹7.0 - 11.5 LPA',
    openings: '190 Openings',
    corridor: 'Sriperumbudur Auto Corridor',
    description: 'Deploy industrial PLC controllers, MQTT telemetry daemons, and SCADA monitoring pipelines.',
    demandBadge: 'Automotive Corridor Priority',
    targetOffer: '₹7.0 - 11.5 LPA Target Offer',
    p1: {
      title: 'Digital Logic, Finite State Machines & Circuitry Telemetry',
      cutoff: 'Requires ≥60% Score',
      description: 'Company-mandated digital logic, state machines, and micro-controller bus communication diagnostic cutoff.',
      diagnosticScore: '63% (Cleared)'
    },
    p2: {
      title: 'Embedded Systems, Industrial Bus Protocols & RTOS',
      description: 'Master core subjects: POSIX threads, industrial Modbus/CAN bus telemetry, and real-time Linux kernels.',
      syllabusRef: 'AICTE Mechatronics Model: EC4901 Edge IoT Sync',
      udemyTrack: 'Embedded Linux, Device Drivers & MQTT Protocol Deployment',
      udemyDesc: 'Kernel module development, device tree configuration, and real-time MQTT streaming architectures.',
      gfgTrack: 'Microcontroller Architecture, Sensor Interfacing & SCADA Networks',
      gfgDesc: 'Serial peripheral interfaces (SPI), I2C communications, and industrial SCADA telemetry.'
    },
    p3: {
      title: 'Industrial Vibration & Temperature Edge Telemetry Filter via Fast Fourier Transform (FFT)',
      description: 'Deploy real-time sensor processing daemons computing FFT on edge gateways with low-power telemetry.',
      warning: '⚠ Replaces generic Arduino LED blinkers with real-time FFT streaming filters',
      starterTemplate: 'https://github.com/omr-cluster/telematics-fft-filter-stream'
    },
    p4: {
      title: 'Hardware-Software Co-Design, Edge Fault Detection & Low-Latency Comms',
      description: '1-on-1 technical interview evaluating RTOS task scheduling, memory leaks in C++, and GPIO bus timing.',
      mentor: 'Murugan P. (Principal Mechatronics Architect, Bosch Automotive)',
      slot: 'Tuesday, 5:00 PM - 5:45 PM (Google Meet)'
    },
    p5: {
      title: 'Direct Clearance to 15 Automotive & Mechatronic Giants (AutoCorridor, Bosch Partners)',
      description: 'Verified candidate profiles fast-tracked to 15 Tier-1 automotive and industrial automation consortiums.',
      buttonText: 'View 15 Eligible Auto/IoT Companies →',
      companies: [
        { name: 'Bosch Automotive Electronics', role: 'Edge Firmware Engineer', pkg: '₹8.0 - 11.5 LPA', loc: 'Sriperumbudur Auto Corridor' },
        { name: 'AutoCorridor Mechatronics', role: 'Industrial IoT Specialist', pkg: '₹7.5 - 10.5 LPA', loc: 'Oragadam Industrial Hub' },
        { name: 'Titan Engineering & Automation (TIAL)', role: 'Robotic Automation Associate', pkg: '₹7.8 - 11.0 LPA', loc: 'Hosur & Coimbatore Hub' },
        { name: 'Hyundai Mobis Tech', role: 'Connected Vehicle Telemetry Dev', pkg: '₹8.0 - 11.2 LPA', loc: 'Sriperumbudur Auto Park' }
      ]
    }
  }
};

// -----------------------------------------------------------------------------
// 2. DYNAMIC DATA STRUCTURE FOR THE 4 SKILL TRACKS (SKILL_PROFILES)
// -----------------------------------------------------------------------------

interface SkillProfile {
  id: string;
  title: string;
  badge: string;
  labs: string;
  description: string;
  level1: {
    badge: string;
    left: {
      title: string;
      desc: string;
    };
    right: {
      title: string;
      desc: string;
    };
  };
  level2: {
    badge: string;
    title: string;
    desc: string;
    buttonText: string;
    challengeName: string;
    verifiedScore: string;
  };
  level3: {
    badge: string;
    title: string;
    desc: string;
    buttonText: string;
    sandboxNode: string;
    terminalSnippet: {
      cmd: string;
      step1: string;
      step2: string;
      successMsg: string;
    };
  };
  level4: {
    badge: string;
    title: string;
    desc: string;
    certName: string;
  };
}

const SKILL_TRACKS: SkillTrackCard[] = [
  {
    id: 'docker-k8s',
    title: 'Docker & Kubernetes Orchestration',
    labs: '15 Lab Exercises',
    badge: 'Infra Core',
    description: 'Master multi-stage container optimization, Pod lifecycle rules, Ingress routing, and network bridges.',
    icon: <Terminal className="w-5 h-5 text-indigo-500" />
  },
  {
    id: 'vector-rag',
    title: 'Vector Search & LLM RAG Pipelines',
    labs: '12 Lab Exercises',
    badge: 'AI Specialization',
    description: 'Build Qdrant vector indexing, semantic search conduits, and chunked embedding ingestion workflows.',
    icon: <Sparkles className="w-5 h-5 text-purple-500" />
  },
  {
    id: 'fastapi',
    title: 'High-Performance FastAPI Systems',
    labs: '10 Lab Exercises',
    badge: 'Backend Core',
    description: 'Construct asynchronous route endpoints, Pydantic type safety, and distributed Redis caching layers.',
    icon: <Code className="w-5 h-5 text-emerald-500" />
  },
  {
    id: 'embedded-iot',
    title: 'Embedded Linux & Edge IoT',
    labs: '14 Lab Exercises',
    badge: 'Hardware Systems',
    description: 'Configure real-time Linux kernels, systemd daemons, GPIO pin drivers, and MQTT edge publishers.',
    icon: <Cpu className="w-5 h-5 text-amber-500" />
  }
];

const SKILL_PROFILES: Record<string, SkillProfile> = {
  'docker-k8s': {
    id: 'docker-k8s',
    title: 'Docker & Kubernetes Orchestration',
    badge: 'Infra Core',
    labs: '15 Lab Exercises',
    description: 'Master multi-stage container optimization, Pod lifecycle rules, Ingress routing, and network bridges.',
    level1: {
      badge: 'Level 1: System Foundations',
      left: {
        title: 'Linux Namespaces & Control Groups',
        desc: 'cgroups resource isolation, process trees, chroot jails, and network interface binding.'
      },
      right: {
        title: 'Dockerfile Optimization & Distroless Builds',
        desc: 'Multi-stage layer minimization, security scanning, and unprivileged user daemons.'
      }
    },
    level2: {
      badge: 'Level 2: Coding Arena Challenge',
      title: 'Proctored Container Image Security & Multi-Stage Linting Arena ↗',
      desc: 'Live container compiler challenge testing multi-stage caching, distroless image builds, and security linting.',
      buttonText: 'Launch Coding Arena Challenge ↗',
      challengeName: 'Container Image Security & Layer Optimizer',
      verifiedScore: 'Verified Arena Score: 80% • Top 15th Percentile in Cluster'
    },
    level3: {
      badge: 'Level 3: Lab Sandbox Practice',
      title: 'Kubernetes Pod Networking & Ingress Controller Sandbox ↗',
      desc: 'Deploy live microservices into the district-funded cloud sandbox without hardware limits.',
      buttonText: 'Enter Cloud Sandbox ↗',
      sandboxNode: 'State Sandbox • Node: lab-omr-gpu02',
      terminalSnippet: {
        cmd: '$ docker build -t candidate-service:v1 -f Dockerfile.multistage .',
        step1: 'Step 1/6: FROM python:3.11-slim as builder [OK]',
        step2: 'Step 2/6: Compiling bytecode & stripping symbols [OK]',
        successMsg: '[SUCCESS] Image size: 48MB (Distroless verified). Assessment score updated to 75%!'
      }
    },
    level4: {
      badge: 'Level 4 Apex • NCrF Level 6.5',
      title: '🏆 NCrF Level 6.5 Certified Container & Cloud Architect',
      desc: 'Earn official NCrF Level 6.5 / AICTE-aligned digital credentials with cryptographic verification hash for Portal 1 recruiters.',
      certName: 'Certified Container & Cloud Architect'
    }
  },

  'vector-rag': {
    id: 'vector-rag',
    title: 'Vector Search & LLM RAG Pipelines',
    badge: 'AI Specialization',
    labs: '12 Lab Exercises',
    description: 'Build Qdrant vector indexing, semantic search conduits, and chunked embedding ingestion workflows.',
    level1: {
      badge: 'Level 1: System Foundations',
      left: {
        title: 'Dense Embedding Generators & Cosine Sim',
        desc: 'High-dimensional vector representations, OpenAI/HuggingFace embeddings, and dot-product distance metrics.'
      },
      right: {
        title: 'Document Chunking & Recursive Splitters',
        desc: 'Token-aware semantic splitting, overlap windows, and metadata extraction pipelines.'
      }
    },
    level2: {
      badge: 'Level 2: Coding Arena Challenge',
      title: 'Proctored Vector Indexing & Semantic Retrieval Benchmark ↗',
      desc: 'Live algorithmic challenge testing HNSW indexing speed, recall accuracy, and embedding normalization.',
      buttonText: 'Launch Vector Benchmark Challenge ↗',
      challengeName: 'Vector Indexing & HNSW Recall Optimizer',
      verifiedScore: 'Verified Benchmark Score: 86% • Top 8th Percentile in Cluster'
    },
    level3: {
      badge: 'Level 3: Lab Sandbox Practice',
      title: 'Qdrant Vector Database Cluster Sandbox ↗',
      desc: 'Deploy distributed vector collections with filtering payloads and hybrid dense-sparse search in the district lab.',
      buttonText: 'Enter Vector DB Sandbox ↗',
      sandboxNode: 'AI Lab Sandbox • Node: lab-guindy-qdrant01',
      terminalSnippet: {
        cmd: '$ python ingest_vectors.py --collection=curriculum_qa --dim=1536',
        step1: 'Step 1/4: Connecting to local Qdrant cluster on port 6333 [OK]',
        step2: 'Step 2/4: Generating embeddings with text-embedding-3-small [OK]',
        successMsg: '[SUCCESS] 14,200 points indexed (HNSW cosine metric). Query latency: 3.2ms!'
      }
    },
    level4: {
      badge: 'Level 4 Apex • NCrF Level 6.5',
      title: '🏆 NCrF Level 6.5 Certified Applied GenAI Engineer',
      desc: 'Earn official NCrF Level 6.5 / AICTE-aligned digital credentials with cryptographic verification hash for AI Hub recruiters.',
      certName: 'Certified Applied GenAI Engineer'
    }
  },

  fastapi: {
    id: 'fastapi',
    title: 'High-Performance FastAPI Systems',
    badge: 'Backend Core',
    labs: '10 Lab Exercises',
    description: 'Construct asynchronous route endpoints, Pydantic type safety, and distributed Redis caching layers.',
    level1: {
      badge: 'Level 1: System Foundations',
      left: {
        title: 'Async/Await Coroutines & Event Loops',
        desc: 'Non-blocking concurrency, asyncio worker pools, and ASGI event loop request dispatching.'
      },
      right: {
        title: 'Pydantic V2 Schema Validation & Type Safety',
        desc: 'Strict type coercion, model serializers, custom validators, and OpenAPI schema generation.'
      }
    },
    level2: {
      badge: 'Level 2: Coding Arena Challenge',
      title: 'Proctored High-Throughput REST Concurrency Challenge ↗',
      desc: 'Live API stress-testing challenge benchmarked with Locust for sub-5ms latencies and zero connection dropouts.',
      buttonText: 'Launch API Concurrency Arena ↗',
      challengeName: 'Asynchronous Route & Rate-Limiter Optimizer',
      verifiedScore: 'Verified Concurrency Score: 84% • Sub-4ms 99th Percentile'
    },
    level3: {
      badge: 'Level 3: Lab Sandbox Practice',
      title: 'Distributed Redis Caching & Background Task Sandbox ↗',
      desc: 'Configure Redis caching layers, background celery workers, and rate-limiting middleware in the district sandbox.',
      buttonText: 'Enter Microservices Sandbox ↗',
      sandboxNode: 'Backend Sandbox • Node: lab-tidel-fastapi03',
      terminalSnippet: {
        cmd: '$ uvicorn app.main:app --workers 4 --loop uvloop --host 0.0.0.0',
        step1: 'Step 1/3: Initializing UVLoop event loop on 4 worker processes [OK]',
        step2: 'Step 2/3: Connecting to Redis sentinel cluster on port 6379 [OK]',
        successMsg: '[SUCCESS] Uvicorn running on 4 workers. 10,000 req/sec benchmark validated!'
      }
    },
    level4: {
      badge: 'Level 4 Apex • NCrF Level 6.5',
      title: '🏆 NCrF Level 6.5 Certified Microservices Backend Engineer',
      desc: 'Earn official NCrF Level 6.5 / AICTE-aligned digital credentials with cryptographic verification hash for TIDEL IT recruiters.',
      certName: 'Certified Microservices Backend Engineer'
    }
  },

  'embedded-iot': {
    id: 'embedded-iot',
    title: 'Embedded Linux & Edge IoT',
    badge: 'Hardware Systems',
    labs: '14 Lab Exercises',
    description: 'Configure real-time Linux kernels, systemd daemons, GPIO pin drivers, and MQTT edge publishers.',
    level1: {
      badge: 'Level 1: System Foundations',
      left: {
        title: 'GPIO Pin Drivers & Hardware Bus Control',
        desc: 'Memory-mapped I/O, I2C and SPI bus transactions, kernel ring buffers, and interrupt service routines.'
      },
      right: {
        title: 'Systemd Daemons & POSIX Threads',
        desc: 'Real-time thread priority scheduling, watchdog timers, and fault-tolerant systemd unit configuration.'
      }
    },
    level2: {
      badge: 'Level 2: Coding Arena Challenge',
      title: 'Proctored Real-Time Telemetry Stream Compression Challenge ↗',
      desc: 'Live microcontroller firmware challenge implementing lightweight delta-encoding and ring-buffer streaming.',
      buttonText: 'Launch Firmware Telemetry Arena ↗',
      challengeName: 'Edge Ring Buffer & Telemetry Compressor',
      verifiedScore: 'Verified Firmware Score: 82% • Zero Packet Loss Cleared'
    },
    level3: {
      badge: 'Level 3: Lab Sandbox Practice',
      title: 'MQTT Broker Cluster & Industrial SCADA Sandbox ↗',
      desc: 'Connect hardware edge sensors to an industrial Mosquitto MQTT broker with SCADA dashboard visualization.',
      buttonText: 'Enter Edge IoT Sandbox ↗',
      sandboxNode: 'IoT Lab Sandbox • Node: lab-auto-edge01',
      terminalSnippet: {
        cmd: '$ mosquitto -c /etc/mosquitto/industrial-scada.conf -d',
        step1: 'Step 1/3: Binding TLS listener on port 8883 with client certificates [OK]',
        step2: 'Step 2/3: Initializing ACL permission rings for industrial sensors [OK]',
        successMsg: '[SUCCESS] Telemetry broker active on port 8883 (TLS). 1,200 sensor channels streaming!'
      }
    },
    level4: {
      badge: 'Level 4 Apex • NCrF Level 6.5',
      title: '🏆 NCrF Level 6.5 Certified Edge Automation Specialist',
      desc: 'Earn official NCrF Level 6.5 / AICTE-aligned digital credentials with cryptographic verification hash for Sriperumbudur auto recruiters.',
      certName: 'Certified Edge Automation Specialist'
    }
  }
};

// Aliases for backward compatibility
SKILL_PROFILES['rag-vector'] = SKILL_PROFILES['vector-rag'];
SKILL_PROFILES['fastapi-systems'] = SKILL_PROFILES['fastapi'];
SKILL_PROFILES['edge-iot'] = SKILL_PROFILES['embedded-iot'];

export const CareerRoadmapView: React.FC = () => {
  // Active top-level view state
  const [activeRoadmapType, setActiveRoadmapType] = useState<RoadmapType>('career');

  // Career Roadmap state
  const [selectedCareerRole, setSelectedCareerRole] = useState<string | null>(null);
  const [selectedCourseModal, setSelectedCourseModal] = useState<CourseModalData | null>(null);

  // Skill Roadmap state
  const [selectedSkillTrack, setSelectedSkillTrack] = useState<string | null>(null);
  const [skillLevel1Status, setSkillLevel1Status] = useState<NodeStatus>('done');
  const [activeMenuNode, setActiveMenuNode] = useState<boolean>(false);

  // Modals & Action States
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState<boolean>(false);
  const [sandboxRunning, setSandboxRunning] = useState<boolean>(false);
  const [sandboxScore, setSandboxScore] = useState<number>(47);
  const [isAptitudeModalOpen, setIsAptitudeModalOpen] = useState<boolean>(false);
  const [isCodingModalOpen, setIsCodingModalOpen] = useState<boolean>(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState<boolean>(false);
  const [isVacanciesModalOpen, setIsVacanciesModalOpen] = useState<boolean>(false);
  const [isProjectBriefOpen, setIsProjectBriefOpen] = useState<boolean>(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const handleRunSandbox = () => {
    setSandboxRunning(true);
    setTimeout(() => {
      setSandboxRunning(false);
      setSandboxScore(75);
      triggerToast('🎉 District Cloud Sandbox build verified! Diagnostic score boosted to 75%.');
    }, 2200);
  };

  // Active Dynamic Objects
  const activeCareerProfile: CareerProfile = selectedCareerRole && CAREER_PROFILES[selectedCareerRole]
    ? CAREER_PROFILES[selectedCareerRole]
    : CAREER_PROFILES['devops'];

  const activeSkillProfile: SkillProfile = selectedSkillTrack && SKILL_PROFILES[selectedSkillTrack]
    ? SKILL_PROFILES[selectedSkillTrack]
    : SKILL_PROFILES['docker-k8s'];

  return (
    <div
      onClick={() => setActiveMenuNode(false)}
      className="space-y-6 animate-fadeIn pb-16"
    >
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slideUp text-xs font-bold max-w-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="leading-relaxed">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors ml-auto cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP SUB-NAVIGATION                                                        */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setActiveRoadmapType('career');
            setActiveMenuNode(false);
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeRoadmapType === 'career'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.01]'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          [ Career Roadmap (Target Job Roles) ]
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveRoadmapType('skill');
            setActiveMenuNode(false);
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeRoadmapType === 'skill'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.01]'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          [ Skill Roadmap (Competency Mastery) ]
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: CAREER ROADMAP (JOB-SEEKER PIPELINE)                            */}
      {/* ========================================================================= */}
      {activeRoadmapType === 'career' && (
        <div className="space-y-6">
          
          {/* STEP 1A: 4-Domain Career Role Selector (When selectedCareerRole === null) */}
          {selectedCareerRole === null ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Target Industrial Career Pathways
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Select a target job profile to generate your end-to-end placement trajectory.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {CAREER_ROLES.map((role) => (
                  <div
                    key={role.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                          {role.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {role.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-black text-slate-900 leading-snug">
                          {role.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                          {role.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-emerald-700 font-mono font-black">{role.salary}</span>
                        <span className="text-slate-500 text-[11px]">{role.openings}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCareerRole(role.id);
                          triggerToast(`Configured career pipeline for ${role.title}.`);
                        }}
                        className="w-full py-2 rounded-xl text-xs font-black bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>View Trajectory →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* STEP 1B: Alternating Branching Career Tree (When Role Selected) */
            <div className="space-y-6">
              
              {/* Top Bar with Back Button */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCareerRole(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>← Back to Career Pathways</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-xl font-black text-slate-900">
                      {activeCareerProfile.title}
                    </h2>
                    <span className="bg-rose-100 text-rose-700 border border-rose-200 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider">
                      {activeCareerProfile.demandBadge}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      • {activeCareerProfile.openings} • {activeCareerProfile.corridor}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-black">
                    {activeCareerProfile.targetOffer}
                  </span>
                </div>
              </div>

              {/* Canvas Layout: Central Spine & Alternating Branches */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-xs relative overflow-hidden">
                
                {/* Central vertical spine line */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-10 bottom-36 w-1 bg-slate-300 pointer-events-none" />

                {/* Alternating Branches Stack */}
                <div className="space-y-12 relative z-10 max-w-5xl mx-auto">
                  
                  {/* ------------------------------------------------------------- */}
                  {/* P1 (Left Branch - Aptitude): DYNAMIC APERTURE SCREENING       */}
                  {/* ------------------------------------------------------------- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                    <div className="relative">
                      <div className="bg-white rounded-2xl border-2 border-rose-200 p-5 shadow-xs hover:shadow-md transition-all space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                            P1: Campus Qualifying Benchmark
                          </span>
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {activeCareerProfile.p1.cutoff}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm font-black text-slate-900">
                            {activeCareerProfile.p1.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                            {activeCareerProfile.p1.description}
                          </p>
                        </div>

                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setIsAptitudeModalOpen(true)}
                            className="px-4 py-2 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                          >
                            <span>Start Diagnostic Aptitude Test ↗</span>
                          </button>
                        </div>
                      </div>

                      {/* Horizontal connector to center */}
                      <div className="hidden md:block absolute right-[-48px] top-1/2 -translate-y-1/2 w-12 h-0.5 bg-slate-300" />
                    </div>

                    {/* Milestone P1 circle on center spine */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center z-20">
                      <div className="w-10 h-10 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shadow-md ring-4 ring-white border border-rose-700">
                        P1
                      </div>
                    </div>

                    <div className="hidden md:block" />
                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* P2 (Right Branch - Prescribed Courses): DYNAMIC RECS         */}
                  {/* ------------------------------------------------------------- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                    <div className="hidden md:block" />

                    {/* Milestone P2 circle on center spine */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center z-20">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md ring-4 ring-white border border-indigo-700">
                        P2
                      </div>
                    </div>

                    <div className="relative">
                      {/* Horizontal connector from center */}
                      <div className="hidden md:block absolute left-[-48px] top-1/2 -translate-y-1/2 w-12 h-0.5 bg-slate-300" />

                      <div className="bg-white rounded-2xl border-2 border-indigo-200 p-5 shadow-xs hover:shadow-md transition-all space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                            P2: Curriculum Foundation &amp; Self-Study Modules
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Sem 5 Verified ✓
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm font-black text-slate-900">
                            {activeCareerProfile.p2.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                            {activeCareerProfile.p2.description}
                          </p>
                        </div>

                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setSelectedCourseModal({
                              title: activeCareerProfile.p2.title,
                              udemyTitle: activeCareerProfile.p2.udemyTrack,
                              udemyDesc: activeCareerProfile.p2.udemyDesc,
                              udemyUrl: 'https://www.udemy.com',
                              gfgTitle: activeCareerProfile.p2.gfgTrack,
                              gfgDesc: activeCareerProfile.p2.gfgDesc,
                              gfgUrl: 'https://www.geeksforgeeks.org',
                              syllabusRef: activeCareerProfile.p2.syllabusRef
                            })}
                            className="px-4 py-2.5 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>View Recommended Courses (Udemy / GeeksforGeeks) ↗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* P3 (Left Branch - Capstone Project): DYNAMIC CAPSTONE BRIEF  */}
                  {/* ------------------------------------------------------------- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                    <div className="relative">
                      <div className="bg-white rounded-2xl border-2 border-blue-300 p-5 shadow-xs hover:shadow-md transition-all space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            P3: Resume Proof of Work
                          </span>
                          <FileCode className="w-4 h-4 text-blue-600" />
                        </div>

                        <div>
                          <h3 className="text-sm font-black text-slate-900">
                            {activeCareerProfile.p3.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                            {activeCareerProfile.p3.description}
                          </p>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{activeCareerProfile.p3.warning}</span>
                        </div>

                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setIsProjectBriefOpen(true)}
                            className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                          >
                            <span>View Capstone Specification ↗</span>
                          </button>
                        </div>
                      </div>

                      {/* Horizontal connector to center */}
                      <div className="hidden md:block absolute right-[-48px] top-1/2 -translate-y-1/2 w-12 h-0.5 bg-slate-300" />
                    </div>

                    {/* Milestone P3 circle on center spine */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center z-20">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md ring-4 ring-white border border-blue-700">
                        P3
                      </div>
                    </div>

                    <div className="hidden md:block" />
                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* P4 (Right Branch - Mock Interview): DYNAMIC INTERVIEW SCREEN */}
                  {/* ------------------------------------------------------------- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                    <div className="hidden md:block" />

                    {/* Milestone P4 circle on center spine */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center z-20">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center shadow-md ring-4 ring-white border border-purple-700">
                        P4
                      </div>
                    </div>

                    <div className="relative">
                      {/* Horizontal connector from center */}
                      <div className="hidden md:block absolute left-[-48px] top-1/2 -translate-y-1/2 w-12 h-0.5 bg-slate-300" />

                      <div className="bg-white rounded-2xl border-2 border-purple-200 p-5 shadow-xs hover:shadow-md transition-all space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                            P4: Systems Evaluation Screening
                          </span>
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>

                        <div>
                          <h3 className="text-sm font-black text-slate-900">
                            {activeCareerProfile.p4.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                            {activeCareerProfile.p4.description}
                          </p>
                        </div>

                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setIsInterviewModalOpen(true)}
                            className="px-4 py-2 rounded-xl text-xs font-black bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                          >
                            <span>Schedule Technical Mock Interview ↗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------------------------------------- */}
                  {/* P5 (Center Apex - Cluster Placement): DYNAMIC HIRING POOL     */}
                  {/* ------------------------------------------------------------- */}
                  <div className="pt-6 flex flex-col items-center relative">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-lg ring-4 ring-emerald-100 border-2 border-emerald-700 mb-4 z-20">
                      P5
                    </div>

                    <div className="w-full max-w-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-indigo-900/60 text-center space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-0.5 rounded-full border border-emerald-500/30">
                          P5: Portal 1 Direct Hiring Clearance
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                        {activeCareerProfile.p5.title}
                      </h3>

                      <p className="text-xs text-indigo-200 leading-relaxed font-medium max-w-md mx-auto">
                        {activeCareerProfile.p5.description}
                      </p>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setIsVacanciesModalOpen(true)}
                          className="px-6 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
                        >
                          <Building2 className="w-4 h-4" />
                          <span>{activeCareerProfile.p5.buttonText}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 2: SKILL ROADMAP (COMPETENCY BETTERMENT & CERTIFICATION)            */}
      {/* ========================================================================= */}
      {activeRoadmapType === 'skill' && (
        <div className="space-y-6">
          
          {/* STEP 2A: 4-Track Skill Mastery Selector (When selectedSkillTrack === null) */}
          {selectedSkillTrack === null ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Technical Competency Tracks
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Choose a high-impact technical skill to sharpen your engineering capabilities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {SKILL_TRACKS.map((track) => (
                  <div
                    key={track.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                          {track.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {track.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-black text-slate-900 leading-snug">
                          {track.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                          {track.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">
                        {track.labs}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSkillTrack(track.id);
                          triggerToast(`Activated skill tree for ${track.title}.`);
                        }}
                        className="text-xs font-black text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Tree →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* STEP 2B: Alternating Skill Mastery Tree with Dynamic Data */
            <div className="space-y-6">
              
              {/* Top Bar with Back Button */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSkillTrack(null);
                      setActiveMenuNode(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>← Back to Skill Tracks</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900">
                      {activeSkillProfile.title}
                    </h2>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Step-by-Step Mastery Tree
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium max-w-sm sm:text-right">
                  Progress upward from foundational systems to official platform-verified digital certification.
                </p>
              </div>

              {/* Canvas Layout: Alternating Tree Canvas */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-xs relative overflow-visible">
                
                {/* Central vertical trunk line */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-10 bottom-36 w-1 bg-slate-300 pointer-events-none" />

                <div className="space-y-12 relative z-10 max-w-4xl mx-auto">
                  
                  {/* ----------------------------------------------------------- */}
                  {/* LEVEL 1 (Foundations): DYNAMIC LEFT & RIGHT TOPICS          */}
                  {/* ----------------------------------------------------------- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                    {/* Left Foundation Card */}
                    <div className="relative">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuNode(!activeMenuNode);
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-xs hover:shadow-md ${
                          skillLevel1Status === 'done'
                            ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-400/30'
                            : skillLevel1Status === 'learning'
                            ? 'border-purple-500 bg-purple-50/30 ring-2 ring-purple-400/40'
                            : skillLevel1Status === 'skipped'
                            ? 'border-slate-300 bg-slate-100/70 text-slate-500 opacity-70'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold text-slate-500">
                            {activeSkillProfile.level1.badge}
                          </span>
                          {skillLevel1Status === 'done' && (
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                            </span>
                          )}
                          {skillLevel1Status === 'learning' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 shrink-0">
                              LEARNING
                            </span>
                          )}
                          {skillLevel1Status === 'skipped' && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-200 text-slate-600 shrink-0">
                              SKIPPED
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-black text-slate-900">
                          {activeSkillProfile.level1.left.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                          {activeSkillProfile.level1.left.desc} Click to change status.
                        </p>

                        {/* Interactive Status Popover */}
                        {activeMenuNode && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] w-56 bg-white rounded-2xl p-2.5 shadow-2xl border border-slate-200 z-50 animate-scaleUp text-left"
                          >
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 py-1 border-b border-slate-100 mb-1 flex items-center justify-between">
                              <span>Module Action</span>
                              <button
                                type="button"
                                onClick={() => setActiveMenuNode(false)}
                                className="text-slate-400 hover:text-slate-700"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="space-y-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setSkillLevel1Status('learning');
                                  setActiveMenuNode(false);
                                  triggerToast('🟣 Marked Level 1 as Currently Learning.');
                                }}
                                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-50 text-purple-700 transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                                <span>🟣 Mark Learning</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSkillLevel1Status('done');
                                  setActiveMenuNode(false);
                                  triggerToast('🟢 Marked Level 1 as Done! Connecting branch illuminated.');
                                }}
                                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-50 text-emerald-700 transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                                <span>🟢 Mark Done</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSkillLevel1Status('skipped');
                                  setActiveMenuNode(false);
                                  triggerToast('✕ Skipped Level 1 Module.');
                                }}
                                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-100 text-slate-600 transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                                <span>✕ Skip Module</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSkillLevel1Status('todo');
                                  setActiveMenuNode(false);
                                  triggerToast('🔄 Reset Level 1 Module to uncompleted state.');
                                }}
                                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-100 text-slate-500 transition-colors flex items-center gap-2 border-t border-slate-100 pt-1.5 cursor-pointer"
                              >
                                <RotateCcw className="w-3 h-3 text-slate-400" />
                                <span>🔄 Reset State</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Horizontal connector line to center */}
                      <div
                        className={`hidden md:block absolute right-[-32px] top-1/2 -translate-y-1/2 w-8 h-0.5 transition-colors ${
                          skillLevel1Status === 'done'
                            ? 'bg-emerald-500'
                            : skillLevel1Status === 'learning'
                            ? 'bg-purple-500'
                            : 'bg-slate-300'
                        }`}
                      />
                    </div>

                    {/* Junction Point on center spine */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center z-20">
                      <span
                        className={`w-3 h-3 rounded-full transition-colors ${
                          skillLevel1Status === 'done'
                            ? 'bg-emerald-500 ring-4 ring-emerald-100'
                            : skillLevel1Status === 'learning'
                            ? 'bg-purple-500 ring-4 ring-purple-100'
                            : 'bg-slate-400 ring-4 ring-white'
                        }`}
                      />
                    </div>

                    {/* Right Foundation Card */}
                    <div className="relative">
                      {/* Horizontal connector line from center */}
                      <div className="hidden md:block absolute left-[-32px] top-1/2 -translate-y-1/2 w-8 h-0.5 bg-slate-300" />

                      <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white shadow-xs hover:shadow-md transition-all">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold text-slate-500">
                            Core Architecture
                          </span>
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 text-[10px] font-bold">
                            ✓
                          </span>
                        </div>

                        <h4 className="text-xs font-black text-slate-900">
                          {activeSkillProfile.level1.right.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                          {activeSkillProfile.level1.right.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ----------------------------------------------------------- */}
                  {/* LEVEL 2 (Right Branch): DYNAMIC PROCTORED CODING ARENA      */}
                  {/* ----------------------------------------------------------- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                    <div className="hidden md:block" />

                    {/* Junction Point on center spine */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center z-20">
                      <span className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100" />
                    </div>

                    <div className="relative">
                      {/* Horizontal connector line from center */}
                      <div className="hidden md:block absolute left-[-32px] top-1/2 -translate-y-1/2 w-8 h-0.5 bg-slate-300" />

                      <div className="p-4 rounded-2xl border-2 border-amber-200 bg-white shadow-xs hover:shadow-md transition-all space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            {activeSkillProfile.level2.badge}
                          </span>
                          <Code className="w-4 h-4 text-amber-600" />
                        </div>

                        <h4 className="text-xs font-black text-slate-900">
                          {activeSkillProfile.level2.title}
                        </h4>

                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                          {activeSkillProfile.level2.desc}
                        </p>

                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setIsCodingModalOpen(true)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{activeSkillProfile.level2.buttonText}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ----------------------------------------------------------- */}
                  {/* LEVEL 3 (Left Branch): DYNAMIC STATE LAB SANDBOX            */}
                  {/* ----------------------------------------------------------- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                    <div className="relative">
                      <div className="p-4 rounded-2xl border-2 border-blue-400 bg-white shadow-xs hover:shadow-md transition-all space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {activeSkillProfile.level3.badge}
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                        </div>

                        <h4 className="text-xs font-black text-slate-900">
                          {activeSkillProfile.level3.title}
                        </h4>

                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                          {activeSkillProfile.level3.desc}
                        </p>

                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setIsSandboxModalOpen(true)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{activeSkillProfile.level3.buttonText}</span>
                          </button>
                        </div>
                      </div>

                      {/* Horizontal connector to center */}
                      <div className="hidden md:block absolute right-[-32px] top-1/2 -translate-y-1/2 w-8 h-0.5 bg-slate-300" />
                    </div>

                    {/* Junction Point on center spine */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center z-20">
                      <span className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100 animate-pulse" />
                    </div>

                    <div className="hidden md:block" />
                  </div>

                  {/* ----------------------------------------------------------- */}
                  {/* LEVEL 4 (Center Apex): DYNAMIC VERIFIED CERTIFICATION APEX  */}
                  {/* ----------------------------------------------------------- */}
                  <div className="pt-6 flex flex-col items-center relative">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-white font-black text-base flex items-center justify-center shadow-lg ring-4 ring-amber-100 border-2 border-amber-600 mb-4 z-20">
                      🏆
                    </div>

                    <div className="w-full max-w-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-indigo-900/60 text-center space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-500/30">
                          {activeSkillProfile.level4.badge}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                        {activeSkillProfile.level4.title}
                      </h3>

                      <p className="text-xs text-indigo-200 leading-relaxed font-medium max-w-md mx-auto">
                        {activeSkillProfile.level4.desc}
                      </p>

                      <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl text-xs font-bold text-slate-300 max-w-xs mx-auto">
                        Ready to Mint (100% Tree Completion Required)
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setIsCertificateModalOpen(true)}
                          className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-lg shadow-amber-500/30 transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
                        >
                          <ShieldCheck className="w-4 h-4 text-slate-950" />
                          <span>Generate Digital Certificate Badge →</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RECOMMENDED COURSES (UDEMY / GEEKSFORGEEKS / AICTE SYLLABUS)       */}
      {/* ========================================================================= */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {selectedCourseModal.syllabusRef}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  Prescribed Learning Modules: {selectedCourseModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourseModal(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Curated external certification tracks aligned with industry hiring standards and state university syllabus credits:
            </p>

            <div className="space-y-3">
              {/* Resource 1: Udemy Certification Track */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-600 text-white">
                      Udemy Certification
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Video Bootcamp</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900">
                    {selectedCourseModal.udemyTitle}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {selectedCourseModal.udemyDesc}
                  </p>
                </div>
                <a
                  href={selectedCourseModal.udemyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-black bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>Open Udemy Track</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Resource 2: GeeksforGeeks Learning Track */}
              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-700 text-white">
                      GeeksforGeeks
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Interactive Guide</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900">
                    {selectedCourseModal.gfgTitle}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {selectedCourseModal.gfgDesc}
                  </p>
                </div>
                <a
                  href={selectedCourseModal.gfgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>Open GFG Guide</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Resource 3: State Syllabus Fixer Alignment */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs font-medium">
                <div className="flex items-center gap-2 text-indigo-700 font-black">
                  <GraduationCap className="w-4 h-4" />
                  <span>State Syllabus Fixer Alignment (AICTE Model)</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Under 2024 State Curriculum Reform, this module replaces outdated legacy syllabus units. Passing verified external tracks counts toward practical credit requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMPER-PROOF DIGITAL CERTIFICATE                                   */}
      {/* ========================================================================= */}
      {isCertificateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border-2 border-amber-500/40 p-7 text-white space-y-5 animate-scaleUp">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  NCrF LEVEL 6.5 CREDENTIAL
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  Official Platform Verified Skill Credential
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCertificateModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Awarded To:</span>
                <span className="text-emerald-400 font-bold">KOWSHIK (LMI-9042)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Specialization:</span>
                <span className="text-white font-bold">{activeSkillProfile.level4.certName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Accreditation:</span>
                <span className="text-indigo-400 font-bold">AICTE / Tamil Nadu State Skill Council</span>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <span className="text-slate-400 text-[11px]">Cryptographic Verification Hash:</span>
                <span className="text-amber-300 text-[10px] break-all bg-slate-900 p-2 rounded border border-slate-800">
                  0x7b4f8a3c9e120da5943b17c988ef01d67a54b3c9
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 font-medium">
                Verified badge directly visible to cluster recruiters in Portal 1.
              </span>
              <button
                type="button"
                onClick={() => {
                  triggerToast('Digital credential badge linked to candidate profile.');
                  setIsCertificateModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all cursor-pointer"
              >
                Attach to Candidate Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: STATE-FUNDED LAB SANDBOX                                           */}
      {/* ========================================================================= */}
      {isSandboxModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border border-slate-700 overflow-hidden text-white animate-scaleUp">
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-slate-300">
                  {activeSkillProfile.level3.sandboxNode}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSandboxModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-950 rounded-2xl p-4 font-mono text-[11px] text-emerald-400 border border-slate-800 min-h-[140px] space-y-1">
                <p className="text-slate-500"># Sector sandbox active: {activeSkillProfile.title}</p>
                <p className="text-slate-300">{activeSkillProfile.level3.terminalSnippet.cmd}</p>
                {sandboxRunning && (
                  <>
                    <p className="text-blue-400">{activeSkillProfile.level3.terminalSnippet.step1}</p>
                    <p className="text-blue-400">{activeSkillProfile.level3.terminalSnippet.step2}</p>
                    <p className="text-amber-400 animate-pulse">Running health check probes &amp; telemetry benchmark...</p>
                  </>
                )}
                {!sandboxRunning && sandboxScore > 65 && (
                  <p className="text-emerald-300 font-bold">
                    {activeSkillProfile.level3.terminalSnippet.successMsg}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400">
                  Current Diagnostic Score: <strong className="text-white">{sandboxScore}%</strong>
                </span>
                <button
                  type="button"
                  disabled={sandboxRunning}
                  onClick={handleRunSandbox}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {sandboxRunning ? 'Compiling in Cloud...' : 'Run Lab Build'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: APTITUDE TEST REVIEW                                               */}
      {/* ========================================================================= */}
      {isAptitudeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {activeCareerProfile.p1.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsAptitudeModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeCareerProfile.p1.description} Cutoff threshold required by consortium employers.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs font-bold text-emerald-800 flex items-center justify-between">
              <span>Required Standard: {activeCareerProfile.p1.cutoff}</span>
              <span className="bg-emerald-100 px-2 py-0.5 rounded text-emerald-900 font-mono">
                Candidate Score: {activeCareerProfile.p1.diagnosticScore}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                triggerToast(`Diagnostic Aptitude benchmark satisfied: ${activeCareerProfile.p1.diagnosticScore}.`);
                setIsAptitudeModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Retake Practice Aptitude Test
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PROCTORED CODING ARENA                                             */}
      {/* ========================================================================= */}
      {isCodingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {activeSkillProfile.level2.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsCodingModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeSkillProfile.level2.desc}
            </p>
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs font-bold text-emerald-800">
              {activeSkillProfile.level2.verifiedScore}
            </div>
            <button
              type="button"
              onClick={() => {
                triggerToast(`Proctored challenge session launched: ${activeSkillProfile.level2.challengeName}`);
                setIsCodingModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-white font-black text-xs hover:bg-amber-600 transition-colors cursor-pointer"
            >
              Launch Coding Sandbox
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PROJECT CAPSTONE BRIEF                                             */}
      {/* ========================================================================= */}
      {isProjectBriefOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Capstone: {activeCareerProfile.p3.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsProjectBriefOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeCareerProfile.p3.description}
            </p>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs font-bold space-y-1">
              <span className="text-slate-500 block">Deliverables Required:</span>
              <span className="text-indigo-700 block">• Public GitHub repository with clean commit history</span>
              <span className="text-indigo-700 block">• Passing CI/CD badge &amp; production telemetry proof</span>
              <span className="text-slate-600 font-mono text-[11px] block mt-1">
                Ref Repo: {activeCareerProfile.p3.starterTemplate}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                triggerToast('Project rubric and repo link copied to clipboard.');
                setIsProjectBriefOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Copy Starter Template Link
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MOCK INTERVIEW SCHEDULER                                           */}
      {/* ========================================================================= */}
      {isInterviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {activeCareerProfile.p4.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsInterviewModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeCareerProfile.p4.description}
            </p>
            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1 text-xs">
              <span className="font-black text-purple-950 block">Next Available Practice Slot</span>
              <span className="text-purple-800 font-medium block">{activeCareerProfile.p4.slot}</span>
              <span className="text-purple-600 text-[11px] block">Mentor: {activeCareerProfile.p4.mentor}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                triggerToast('Mock interview confirmed! Calendar invite sent to student email.');
                setIsInterviewModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SECTOR ELIGIBLE CLUSTER HIRING COMPANIES                           */}
      {/* ========================================================================= */}
      {isVacanciesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {activeCareerProfile.p5.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsVacanciesModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Verified hiring consortium partners currently interviewing candidates who achieve ≥75% Factory Readiness in {activeCareerProfile.title}:
            </p>
            <div className="space-y-2.5">
              {activeCareerProfile.p5.companies.map((co, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-black text-slate-900">{co.name}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">{co.role} • {co.loc}</span>
                  </div>
                  <span className="font-mono font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                    {co.pkg}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                triggerToast(`Candidate portfolio dispatched to ${activeCareerProfile.title} Cluster Hiring Hub!`);
                setIsVacanciesModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              Pre-Register for Cluster Drive
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export { CareerRoadmapView as CareerRoadmap };
