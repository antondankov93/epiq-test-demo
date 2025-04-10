import { KnowledgeUnitSchema, Document, CustomTypeDefinition } from '@/types/common.ts';

export const knowledgeUnitSchemas: KnowledgeUnitSchema[] = [
  {
    "Frame Label": "employment",
    "Frame ID": "employment",
    "Fields": [
      { 
        "name": "person", 
        "id": "person", 
        "type": ["LIST_PERSON"], 
        "required": true 
      },
      { 
        "name": "company", 
        "id": "company", 
        "type": ["LIST_COMPANY"], 
        "required": false 
      },
      { 
        "name": "title", 
        "id": "title", 
        "type": "string", 
        "required": false 
      },
      { 
        "name": "dept", 
        "id": "dept", 
        "type": "string", 
        "required": false 
      },
      { 
        "name": "time", 
        "id": "time", 
        "type": ["email-date", "past", "future"], 
        "required": false 
      }
    ]
  },
  {
    "Frame Label": "sentiment",
    "Frame ID": "sentiment",
    "Fields": [
      { 
        "name": "by", 
        "id": "by", 
        "type": ["LIST_PERSON"], 
        "required": true 
      },
      { 
        "name": "towards", 
        "id": "towards", 
        "type": ["LIST_PERSON", "LIST_COMPANY"], 
        "required": true 
      },
      { 
        "name": "polarity", 
        "id": "polarity", 
        "type": ["positive", "negative", "neutral"], 
        "required": true 
      }
    ]
  }
];

export const customTypes: CustomTypeDefinition[] = [
  {
    "type ID": "CUSTOM_DATE",
    "Type Label": "Date",
    "Fields": [
      {
        "id": "month",
        "name": "Month",
        "type": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "required": false
      },
      {
        "id": "day",
        "name": "Day",
        "type": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        "required": false
      },
      {
        "id": "year",
        "name": "Year",
        "type": "Integer",
        "required": false
      }
    ]
  }
];

export const dynamicLists = {
  "DYNAMIC_PEOPLE": [
    "John Smith",
    "Jane Doe",
    "Robert Johnson",
    "Emily Davis",
    "Michael Brown",
    "Sarah Wilson",
    "David Miller",
    "Jennifer Taylor",
    "James Anderson",
    "Lisa Thomas"
  ],
  "DYNAMIC_COMPANY": [
    "Acme Corporation",
    "Globex Inc.",
    "Initech",
    "Umbrella Corporation",
    "Stark Industries",
    "Wayne Enterprises",
    "Cyberdyne Systems",
    "Soylent Corp",
    "Massive Dynamic",
    "Oscorp Industries"
  ]
};

export const documents: Document[] = [
  {
    id: "doc1",
    title: "Email from John Smith",
    content: `From: john.smith@example.com
To: hr@acmecorp.com
Subject: Job Application Follow-up

Dear HR Team,

I wanted to follow up on my application for the Senior Software Engineer position at Acme Corporation. I submitted my application two weeks ago and I'm very excited about the opportunity to join your team.

I have over 8 years of experience in software development, with a focus on backend systems and cloud infrastructure. I believe my skills would be a great fit for the Engineering department at Acme.

I'm particularly interested in this role because I've been a long-time admirer of Acme's innovative approach to technology solutions. I believe I could contribute significantly to your upcoming projects.

Please let me know if you need any additional information from me. I'm looking forward to hearing back from you.

Best regards,
John Smith
Phone: (555) 123-4567`,
    hasAnnotations: false,
    knowledgeUnits: []
  },
  {
    id: "doc2",
    title: "Product Review Email",
    content: `From: emily.davis@example.com
To: feedback@globexinc.com
Subject: Review of your new XYZ product

Hello Globex Team,

I recently purchased your new XYZ product and I wanted to share my thoughts with you.

Overall, I'm very impressed with the quality and functionality of the product. The user interface is intuitive and the performance exceeds my expectations. The customer service I received when I had a question was also excellent.

However, I did notice a few minor issues that could be improved in future versions:
1. The battery life is shorter than advertised
2. The mobile app occasionally crashes on Android devices
3. The user manual could be more detailed

Despite these small issues, I'm very satisfied with my purchase and would recommend Globex products to my colleagues and friends. Your company consistently delivers high-quality products that make a difference.

Thank you for your commitment to excellence.

Regards,
Emily Davis
Satisfied Customer`,
    hasAnnotations: false,
    knowledgeUnits: []
  },
  {
    id: "doc3",
    title: "Meeting Minutes",
    content: `MEETING MINUTES
Project: Q3 Strategic Planning
Date: July 15, 2023
Attendees: Sarah Wilson (CEO), David Miller (CTO), Jennifer Taylor (CFO), James Anderson (COO)

AGENDA ITEMS:

1. Q2 Performance Review
Sarah Wilson presented the Q2 results, noting that we exceeded revenue targets by 12% but fell short on new customer acquisition goals by 8%. Jennifer Taylor explained that the higher revenue came from existing customers upgrading their service plans.

2. Technology Roadmap
David Miller outlined the development priorities for Q3:
- Complete the migration to the new cloud infrastructure
- Launch the mobile application redesign
- Begin development on the AI-assisted customer service feature

James expressed concerns about the timeline for the AI feature, suggesting we might need to hire additional developers. David agreed to review the resource allocation and provide an updated timeline by next week.

3. Budget Allocation
Jennifer presented the proposed budget for Q3, with increased allocation for the marketing department to address the customer acquisition shortfall. After discussion, the team approved the budget with minor adjustments to the R&D allocation.

4. Market Expansion
James proposed entering the European market in Q4, presenting market research that shows significant demand for our services. Sarah suggested forming a task force to develop a detailed expansion plan, with James as the lead.

ACTION ITEMS:
- David to revise technology roadmap timeline (Due: July 22)
- Jennifer to finalize Q3 budget (Due: July 20)
- James to form market expansion task force (Due: July 25)
- Sarah to schedule follow-up meeting (Due: July 30)

Next meeting scheduled for August 1, 2023`,
    hasAnnotations: false,
    knowledgeUnits: []
  }
];
