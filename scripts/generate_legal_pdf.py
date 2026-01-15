#!/usr/bin/env python3
"""
Script to generate the Legal Notice PDF for Matcha.
Uses reportlab to create a professional PDF document.

Run: python scripts/generate_legal_pdf.py
Output: public/legal-notice.pdf
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
import os

# Colors
PRIMARY_COLOR = HexColor("#7c3aed")  # Purple primary
DARK_COLOR = HexColor("#1f2937")
GRAY_COLOR = HexColor("#6b7280")

def create_legal_pdf():
    # Create public directory if it doesn't exist
    output_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "legal-notice.pdf")

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )

    # Styles
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=DARK_COLOR,
        spaceAfter=20,
        alignment=TA_LEFT,
        fontName='Helvetica-Bold'
    )

    subtitle_style = ParagraphStyle(
        'Subtitle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=GRAY_COLOR,
        spaceAfter=30
    )

    section_title_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=PRIMARY_COLOR,
        spaceBefore=25,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontSize=10,
        textColor=DARK_COLOR,
        spaceAfter=8,
        leading=14
    )

    label_style = ParagraphStyle(
        'Label',
        parent=styles['Normal'],
        fontSize=9,
        textColor=GRAY_COLOR,
        spaceAfter=2,
        fontName='Helvetica-Bold'
    )

    # Content
    story = []

    # Header
    story.append(Paragraph("🍵 Matcha", ParagraphStyle('Logo', fontSize=14, textColor=PRIMARY_COLOR, fontName='Helvetica-Bold')))
    story.append(Spacer(1, 20))
    story.append(Paragraph("Legal Notice", title_style))
    story.append(Paragraph("Mentions Légales & Editorial Information", subtitle_style))
    story.append(Paragraph("Last updated: January 15, 2026", ParagraphStyle('Date', fontSize=10, textColor=GRAY_COLOR)))
    story.append(Spacer(1, 30))

    # Section 1: Editor & Company Information
    story.append(Paragraph("1. Editor & Company Information", section_title_style))
    story.append(Paragraph("Matcha Dating is a registered trademark of <b>Matcha Media Group SAS</b>.", body_style))
    story.append(Spacer(1, 10))

    info_data = [
        ["HEAD OFFICE", "REGISTRATION"],
        ["42 Rue de l'Innovation\n75001 Paris, France", "RCS Paris B 123 456 789\nCapital: 50,000€"],
        ["", ""],
        ["DIRECTOR OF PUBLICATION", "CONTACT"],
        ["School 42, Project Lead", "legal@matcha.42.fr\n+33 1 00 00 00 00"]
    ]

    for i in range(0, len(info_data), 3):
        story.append(Paragraph(f"<b>{info_data[i][0]}</b>", label_style))
        story.append(Paragraph(info_data[i+1][0].replace('\n', '<br/>'), body_style))
        if i+1 < len(info_data):
            story.append(Paragraph(f"<b>{info_data[i][1]}</b>", label_style))
            story.append(Paragraph(info_data[i+1][1].replace('\n', '<br/>'), body_style))

    # Section 2: Hosting Services
    story.append(Paragraph("2. Hosting Services", section_title_style))
    story.append(Paragraph("The Matcha platform is hosted on secure servers provided by:", body_style))
    story.append(Spacer(1, 5))
    story.append(Paragraph("<b>Hosting Provider:</b> Vercel Inc.", body_style))
    story.append(Paragraph("340 S Lemon Ave #4133, Walnut, CA 91789, USA", body_style))
    story.append(Spacer(1, 5))
    story.append(Paragraph("<b>Database:</b> PostgreSQL on dedicated European servers", body_style))
    story.append(Paragraph("GDPR Compliant Infrastructure", body_style))

    # Section 3: Intellectual Property
    story.append(Paragraph("3. Intellectual Property", section_title_style))
    story.append(Paragraph(
        "All content present on the Matcha platform, including but not limited to text, graphics, "
        "logos, icons, images, audio clips, and software, is the exclusive property of Matcha Media Group SAS "
        "or its content suppliers and is protected by international copyright laws.",
        body_style
    ))
    story.append(Paragraph(
        "Any reproduction, representation, modification, publication, or adaptation of all or part of "
        "the elements of the site, regardless of the means or process used, is prohibited without prior "
        "written authorization from Matcha Media Group SAS.",
        body_style
    ))
    story.append(Paragraph(
        "Unauthorized use of the site's content may result in legal action for infringement.",
        body_style
    ))

    # Section 4: Privacy & Data Protection
    story.append(Paragraph("4. Privacy & Data Protection", section_title_style))
    story.append(Paragraph(
        "In accordance with the General Data Protection Regulation (GDPR), you have the following rights:",
        body_style
    ))
    story.append(Spacer(1, 5))

    rights = [
        "• Right of access to your personal data",
        "• Right to rectification",
        "• Right to erasure (right to be forgotten)",
        "• Right to data portability",
        "• Right to object to processing",
        "• Right to withdraw consent"
    ]
    for right in rights:
        story.append(Paragraph(right, body_style))

    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "To exercise these rights, contact our Data Protection Officer at: <b>privacy@matcha.42.fr</b>",
        body_style
    ))

    # Section 5: Cookies
    story.append(Paragraph("5. Cookies", section_title_style))
    story.append(Paragraph(
        "The site uses technical cookies necessary for the proper functioning of the application. "
        "These cookies allow us to maintain your user session and preferences.",
        body_style
    ))

    # Section 6: Limitation of Liability
    story.append(Paragraph("6. Limitation of Liability", section_title_style))
    story.append(Paragraph(
        "Matcha is an educational project. The project team cannot be held responsible for any direct "
        "or indirect damages resulting from the use of the site.",
        body_style
    ))

    # Section 7: Terms of Use
    story.append(Paragraph("7. Terms of Use", section_title_style))
    story.append(Paragraph(
        "By using this site, you accept these legal notices. Use of the service is reserved for "
        "adults (18 years and older).",
        body_style
    ))

    # Section 8: Contact
    story.append(Paragraph("8. Contact", section_title_style))
    story.append(Paragraph(
        "For any questions regarding these legal notices, you can contact us at:",
        body_style
    ))
    story.append(Paragraph("<b>legal@matcha.42.fr</b>", body_style))

    # Footer
    story.append(Spacer(1, 40))
    story.append(Paragraph(
        "© 2026 Matcha Media Group SAS. All rights reserved.",
        ParagraphStyle('Footer', fontSize=9, textColor=GRAY_COLOR, alignment=TA_CENTER)
    ))
    story.append(Paragraph(
        "This document was automatically generated.",
        ParagraphStyle('FooterNote', fontSize=8, textColor=GRAY_COLOR, alignment=TA_CENTER)
    ))

    # Build PDF
    doc.build(story)
    print(f"✅ PDF generated: {output_path}")
    return output_path

if __name__ == "__main__":
    create_legal_pdf()
