import { NextResponse } from 'next/server';
import { experiences } from '@/lib/data/experiences';
import { skillCategories } from '@/lib/data/advancedSkills';
import puppeteer from 'puppeteer';

// Personal information - you can move this to a separate data file if needed
const personalInfo = {
  name: 'Scott Devines',
  title: 'Blockchain & Smart Contract Developer',
  email: 'scott.devines@example.com', // Update with your actual email
  phone: '+1 (555) 123-4567', // Update with your actual phone
  location: 'Remote / Available Worldwide',
  website: 'https://your-portfolio.com', // Update with your actual domain
  linkedin: 'https://linkedin.com/in/scott-devines', // Update with your LinkedIn
  github: 'https://github.com/Torof',
  summary: 'Experienced Full Stack Web3 Developer with 6+ years specializing in blockchain, smart contracts, and dApp development. Proven track record in DeFi protocols, NFT platforms, and Layer 2 solutions. Expert in Solidity, Ethereum ecosystem, and modern Web3 technologies.'
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const format = url.searchParams.get('format') || 'pdf';
    
    const workExperiences = experiences.filter(exp => exp.type === 'work');
    const hackathonExperiences = experiences.filter(exp => exp.type === 'hackathon');
    
    // Get key skills from different categories
    const smartContractSkills = skillCategories.find(cat => cat.id === 'smart-contracts')?.skills || [];
    const defiSkills = skillCategories.find(cat => cat.id === 'defi')?.skills || [];
    const securitySkills = skillCategories.find(cat => cat.id === 'security')?.skills || [];
    const layer2Skills = skillCategories.find(cat => cat.id === 'layer2')?.skills || [];
    
    const htmlContent = generateCVHTML({
      personalInfo,
      workExperiences,
      hackathonExperiences,
      skills: {
        smartContracts: smartContractSkills,
        defi: defiSkills,
        security: securitySkills,
        layer2: layer2Skills
      }
    });

    if (format === 'html') {
      return new NextResponse(htmlContent, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': 'inline; filename="scott-devines-cv.html"'
        }
      });
    }

    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      },
      printBackground: true
    });
    
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="scott-devines-cv.pdf"'
      }
    });

  } catch (error) {
    console.error('Error generating CV:', error);
    return NextResponse.json(
      { error: 'Failed to generate CV', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function generateCVHTML(data: any): string {
  const { personalInfo, workExperiences, hackathonExperiences, skills } = data;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.name} - CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
            font-size: 11pt;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
        }
        
        .name {
            font-size: 28pt;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 8px;
        }
        
        .title {
            font-size: 16pt;
            color: #6366f1;
            margin-bottom: 15px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            font-size: 10pt;
            color: #64748b;
        }
        
        .contact-info span {
            white-space: nowrap;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section-title {
            font-size: 14pt;
            font-weight: bold;
            color: #1e40af;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .summary {
            text-align: justify;
            line-height: 1.8;
            color: #374151;
            font-size: 11pt;
        }
        
        .experience-item {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        
        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
            flex-wrap: wrap;
        }
        
        .job-title {
            font-weight: bold;
            color: #1f2937;
            font-size: 12pt;
        }
        
        .company {
            color: #6366f1;
            font-weight: 600;
            font-size: 11pt;
        }
        
        .duration {
            color: #64748b;
            font-size: 10pt;
            font-weight: 500;
        }
        
        .description {
            color: #4b5563;
            margin-bottom: 8px;
            font-style: italic;
        }
        
        .achievements {
            list-style: none;
            padding: 0;
        }
        
        .achievements li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 4px;
            color: #374151;
        }
        
        .achievements li:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #6366f1;
            font-weight: bold;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .skill-category {
            background: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            border-left: 4px solid #6366f1;
        }
        
        .skill-category-title {
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 8px;
            font-size: 11pt;
        }
        
        .skill-list {
            font-size: 10pt;
            color: #64748b;
            line-height: 1.4;
        }
        
        .hackathons {
            background: #fafafa;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        
        .hackathon-item {
            margin-bottom: 12px;
        }
        
        .hackathon-name {
            font-weight: bold;
            color: #7c3aed;
            font-size: 11pt;
        }
        
        .hackathon-description {
            font-size: 10pt;
            color: #6b7280;
            margin-top: 2px;
        }
        
        @media print {
            body {
                margin: 0;
                padding: 15mm;
                font-size: 10pt;
            }
            
            .section {
                page-break-inside: avoid;
                margin-bottom: 20px;
            }
            
            .experience-item {
                page-break-inside: avoid;
                margin-bottom: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${personalInfo.name}</div>
        <div class="title">${personalInfo.title}</div>
        <div class="contact-info">
            <span>📧 ${personalInfo.email}</span>
            <span>📱 ${personalInfo.phone}</span>
            <span>📍 ${personalInfo.location}</span>
            <span>🌐 ${personalInfo.website}</span>
            <span>💼 LinkedIn</span>
            <span>👨‍💻 GitHub: ${personalInfo.github}</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="summary">${personalInfo.summary}</div>
    </div>

    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${workExperiences.map(exp => `
            <div class="experience-item">
                <div class="experience-header">
                    <div>
                        <div class="job-title">${exp.position}</div>
                        <div class="company">${exp.company}</div>
                    </div>
                    <div class="duration">${exp.startDate} - ${exp.endDate}</div>
                </div>
                <div class="description">${exp.description}</div>
                <ul class="achievements">
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <div class="section-title">Technical Skills</div>
        <div class="skills-grid">
            <div class="skill-category">
                <div class="skill-category-title">Smart Contract Development</div>
                <div class="skill-list">${skills.smartContracts.slice(0, 6).map(skill => skill.name).join(' • ')}</div>
            </div>
            <div class="skill-category">
                <div class="skill-category-title">DeFi Protocols</div>
                <div class="skill-list">${skills.defi.slice(0, 6).map(skill => skill.name).join(' • ')}</div>
            </div>
            <div class="skill-category">
                <div class="skill-category-title">Security & Auditing</div>
                <div class="skill-list">${skills.security.slice(0, 6).map(skill => skill.name).join(' • ')}</div>
            </div>
            <div class="skill-category">
                <div class="skill-category-title">Layer 2 Solutions</div>
                <div class="skill-list">${skills.layer2.slice(0, 6).map(skill => skill.name).join(' • ')}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Hackathons & Competitions</div>
        <div class="hackathons">
            ${hackathonExperiences.map(hackathon => `
                <div class="hackathon-item">
                    <div class="hackathon-name">${hackathon.company} - ${hackathon.description.split(' - ')[0]}</div>
                    <div class="hackathon-description">${hackathon.description}</div>
                    <ul class="achievements">
                        ${hackathon.achievements.slice(0, 3).map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>
  `;
}