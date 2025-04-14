import type {
  KnowledgeUnitSchema,
  Document,
  CustomTypeDefinition,
} from '@/types/common';

export const knowledgeUnitSchemas: KnowledgeUnitSchema[] = [
  {
    'Frame Label': 'employment',
    'Frame ID': 'employment',
    Fields: [
      {
        name: 'person',
        id: 'person',
        type: ['PERSON_1', 'PERSON_2', 'PERSON_3'],
        required: true,
      },
      {
        name: 'start date',
        id: 'start_date',
        type: 'CUSTOM_DATE',
        required: false,
      },
      {
        name: 'company',
        id: 'company',
        type: ['COMPANY_1', 'COMPANY_2', 'COMPANY_3'],
        required: false,
      },
      {
        name: 'title',
        id: 'title',
        type: 'string',
        required: false,
      },
      {
        name: 'dept',
        id: 'dept',
        type: 'string',
        required: false,
      },
      {
        name: 'time',
        id: 'time',
        type: ['email-date', 'past', 'future'],
        required: false,
      },
    ],
  },
  {
    'Frame Label': 'sentiment',
    'Frame ID': 'sentiment',
    Fields: [
      {
        name: 'by',
        id: 'by',
        type: ['PERSON_1', 'PERSON_2', 'PERSON_3'],
        required: true,
      },
      {
        name: 'towards',
        id: 'towards',
        type: [
          'PERSON_1',
          'PERSON_2',
          'PERSON_3',
          'COMPANY_1',
          'COMPANY_2',
          'COMPANY_3',
          'OTHER',
        ],
        required: true,
      },
      {
        name: 'polarity',
        id: 'polarity',
        type: ['positive', 'negative', 'neutral'],
        required: true,
      },
    ],
  },
];

export const customTypes: CustomTypeDefinition[] = [
  {
    'type ID': 'CUSTOM_DATE',
    'Type Label': 'Date',
    Fields: [
      {
        id: 'month',
        name: 'Month',
        type: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        required: false,
      },
      {
        id: 'day',
        name: 'Day',
        type: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
        required: false,
      },
      {
        id: 'year',
        name: 'Year',
        type: 'Integer',
        required: false,
      },
    ],
  },
];

export const dynamicLists = {
  DYNAMIC_PEOPLE: [
    'John Smith',
    'Jane Doe',
    'Robert Johnson',
    'Emily Davis',
    'Michael Brown',
    'Sarah Wilson',
    'David Miller',
    'Jennifer Taylor',
    'James Anderson',
    'Lisa Thomas',
  ],
  DYNAMIC_COMPANY: [
    'Acme Corporation',
    'Globex Inc.',
    'Initech',
    'Umbrella Corporation',
    'Stark Industries',
    'Wayne Enterprises',
    'Cyberdyne Systems',
    'Soylent Corp',
    'Massive Dynamic',
    'Oscorp Industries',
  ],
};

export const documents: Document[] = [
  {
    id: 'doc1',
    title: 'Company Anniversary',
    content: `Subject: Company Anniversary
==================================================
Subject: Celebrating Your Remarkable Journey at ABC Corp

Dear John,

Congratulations on reaching your five-year work anniversary with ABC Corp! Your dedication and drive have contributed greatly to our success, and we appreciate your commitment. We're fortunate to have a professional like you in our team.

Best Regards,
Amy Wilson,
Senior Manager, ABC Corp.`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc2',
    title: 'Performance Review',
    content: `Subject: Performance Review
==================================================
Subject: Upcoming Performance Review Schedule

Dear Janet,

I trust this email finds you well. I wanted to inform you that your annual performance review, marking your third year with Thompson Technologies, will take place next week. Your dedication and hard work have been instrumental in our team's success.

Best regards,

John Smith
Senior Manager, Thompson Technologies`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc3',
    title: 'Client Feedback',
    content: `Subject: Client Feedback
==================================================
Subject: Client Feedback for Our Recent Project

Dear Mariah Thompson,

I hope this email finds you well. Since you started working at BrightStar Communications in 2018, your insights and feedback have been instrumental in shaping our collaborations. Your recent suggestions have significantly improved our project's efficiency.

Best Regards,
Jessica Stewart
Project Manager, Apex Solutions Ltd.`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc4',
    title: 'Team Transition Update',
    content: `Subject: Team Transition Update
==================================================
Subject: Welcome to the Development Team

Dear Robert Chen,

I'm pleased to announce your transfer from QA to the Development team at TechCorp Solutions. Since joining us in 2021, your technical skills and problem-solving abilities have consistently impressed the leadership team.

Best Regards,
Michael Brown
Head of Engineering, TechCorp Solutions`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc5',
    title: 'Promotion Announcement',
    content: `Subject: Promotion Announcement
==================================================
Subject: Congratulations on Your Promotion

Dear Sarah Wilson,

It gives me great pleasure to announce your promotion to Senior Product Manager at Innovation Labs. Your outstanding performance since joining us in 2019 has demonstrated your leadership capabilities and strategic thinking.

Warm Regards,
David Miller
CEO, Innovation Labs`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc6',
    title: 'Department Transfer',
    content: `Subject: Department Transfer
==================================================
Subject: Marketing Department Transfer Confirmation

Dear James Anderson,

This email confirms your transfer to the Marketing Department at Digital Dynamics. Your experience in customer relations since 2020 will be valuable in your new role as Marketing Specialist.

Best Wishes,
Jennifer Taylor
HR Director, Digital Dynamics`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc7',
    title: 'New Role Assignment',
    content: `Subject: New Role Assignment
==================================================
Subject: Project Lead Appointment

Dear Lisa Thomas,

Following your exceptional work at Nexus Technologies since 2017, I'm delighted to appoint you as Lead Developer for the upcoming CloudScale project. Your technical expertise will be crucial for this initiative.

Regards,
Robert Johnson
CTO, Nexus Technologies`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc8',
    title: 'Performance Recognition',
    content: `Subject: Performance Recognition
==================================================
Subject: Outstanding Q3 Performance

Dear Emily Davis,

Your contributions to Vector Industries since joining our Sales team in 2022 have been remarkable. Your recent closing of the MediaTech deal showcases your exceptional abilities.

Best Regards,
Michael Zhang
Sales Director, Vector Industries`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc9',
    title: 'Team Restructuring',
    content: `Subject: Team Restructuring
==================================================
Subject: New Team Assignment

Dear Alex Martinez,

As part of our organizational changes at Quantum Systems, you'll be transitioning to the Cloud Infrastructure team. Your work in DevOps since 2019 has prepared you well for this role.

Regards,
Patricia Wong
Director of Operations, Quantum Systems`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc10',
    title: 'Project Assignment',
    content: `Subject: Project Assignment
==================================================
Subject: AI Initiative Lead Role

Dear Daniel Kim,

Based on your impressive track record at DataSphere Analytics since 2020, we'd like you to lead our new AI implementation project. Your expertise in machine learning makes you ideal for this position.

Best Regards,
Rachel Foster
Innovation Director, DataSphere Analytics`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc11',
    title: 'Department Recognition',
    content: `Subject: Department Recognition
==================================================
Subject: Excellence in Customer Support

Dear Maria Garcia,

Your dedication to customer satisfaction at CloudNet Solutions since 2021 has set new standards for our support team. Your recent handling of the Enterprise client migration was exemplary.

Warm Regards,
Thomas Wilson
Customer Success Manager, CloudNet Solutions`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc12',
    title: 'Role Expansion',
    content: `Subject: Role Expansion
==================================================
Subject: Additional Responsibilities Assignment

Dear Kevin O'Brien,

Given your strong performance at Stellar Technologies since 2018, we're expanding your role to include oversight of the Asia-Pacific region. Your international experience will be valuable.

Best Wishes,
Amanda Chen
Global Operations Director, Stellar Technologies`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc13',
    title: 'Team Leadership',
    content: `Subject: Team Leadership
==================================================
Subject: New Team Lead Appointment

Dear Sophia Patel,

Your exceptional work at Fusion Dynamics since 2019 has led to your selection as Team Lead for the Mobile Development group. Your technical leadership has been invaluable.

Regards,
Chris Thompson
Engineering Director, Fusion Dynamics`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc14',
    title: 'Project Success',
    content: `Subject: Project Success
==================================================
Subject: Recognition of Project Achievement

Dear William Lee,

Your management of the GlobalConnect project at Apex Digital since 2021 has exceeded expectations. Your ability to coordinate cross-functional teams has been crucial to our success.

Best Regards,
Laura Martinez
Project Director, Apex Digital`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc15',
    title: 'Department Transition',
    content: `Subject: Department Transition
==================================================
Subject: Welcome to Product Management

Dear Nicole Anderson,

Your transition from Engineering to Product Management at TechSphere Inc. marks an exciting new chapter. Your technical background since joining us in 2020 will be invaluable in this role.

Warm Regards,
Mark Wilson
Head of Product, TechSphere Inc.`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc16',
    title: 'Role Recognition',
    content: `Subject: Role Recognition
==================================================
Subject: Outstanding Technical Leadership

Dear Ryan Cooper,

Since joining Innovate Solutions in 2017, your technical leadership has transformed our development practices. Your recent architecture improvements have significantly enhanced our platform.

Best Wishes,
Sarah Johnson
CTO, Innovate Solutions`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc17',
    title: 'Team Expansion',
    content: `Subject: Team Expansion
==================================================
Subject: Growth Team Leadership Role

Dear Michelle Wong,

Your impressive results at Growth Dynamics since 2022 have led to your appointment as Growth Team Lead. Your data-driven approach will be crucial in this expanded role.

Regards,
David Chen
CEO, Growth Dynamics`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc18',
    title: 'Department Achievement',
    content: `Subject: Department Achievement
==================================================
Subject: Recognition of Security Initiatives

Dear Jordan Taylor,

Your cybersecurity initiatives at SecureNet Technologies since 2019 have significantly strengthened our infrastructure. Your proactive approach has prevented numerous potential incidents.

Best Regards,
Elena Rodriguez
Security Director, SecureNet Technologies`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc19',
    title: 'Role Advancement',
    content: `Subject: Role Advancement
==================================================
Subject: Senior Architect Promotion

Dear Andrew Kim,

Your contributions to CloudScale Systems since 2018 have been exceptional. Your promotion to Senior Solutions Architect reflects your technical excellence and leadership.

Warm Regards,
Michael Brown
Engineering Director, CloudScale Systems`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc20',
    title: 'Project Leadership',
    content: `Subject: Project Leadership
==================================================
Subject: AI Research Team Lead

Dear Emma Thompson,

Since joining Quantum AI Labs in 2020, your research contributions have been groundbreaking. We're excited to have you lead our new Natural Language Processing initiative.

Best Wishes,
James Wilson
Research Director, Quantum AI Labs`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc21',
    title: 'Team Recognition',
    content: `Subject: Team Recognition
==================================================
Subject: Excellence in Data Science

Dear Lucas Martinez,

Your innovative approaches to data analysis at DataTech Solutions since 2021 have revolutionized our predictive models. Your recent work on customer behavior analysis has been particularly impactful.

Regards,
Hannah Chen
Analytics Director, DataTech Solutions`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc22',
    title: 'Department Leadership',
    content: `Subject: Department Leadership
==================================================
Subject: Head of Innovation Appointment

Dear Olivia Park,

Your visionary leadership at Future Technologies since 2019 has earned you the position of Head of Innovation. Your track record of successful product launches speaks for itself.

Best Regards,
Richard Lee
CEO, Future Technologies`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
  {
    id: 'doc23',
    title: 'Career Milestone',
    content: `Subject: Career Milestone
==================================================
Subject: Five Years of Excellence

Dear Benjamin Wilson,

As you complete five years at Digital Frontiers, your contributions to our blockchain initiatives since 2018 have been invaluable. Your technical expertise has shaped our platform's evolution.

Warm Regards,
Victoria Chang
Technology Director, Digital Frontiers`,
    hasAnnotations: false,
    knowledgeUnits: [],
  },
];
