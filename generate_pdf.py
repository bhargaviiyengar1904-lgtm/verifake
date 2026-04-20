import os
from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'DeepGuard AI Documentation', 0, 1, 'C')

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(5)

    def chapter_body(self, body):
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, body)
        self.ln()

    def add_chapter(self, title, body):
        self.add_page()
        self.chapter_title(title)
        self.chapter_body(body)

def create_pdf():
    pdf = PDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 10, 'This is the DeepGuard AI codebase documentation.', 0, 1)
    pdf.add_chapter('Introduction', 'DeepGuard AI is a tool that automates deep learning model verification.')
    pdf.add_chapter('Getting Started', 'To get started, clone the repository and follow the instructions provided in the README.')
    # Add more chapters as needed
    pdf_file_path = 'DeepGuard_AI_Documentation.pdf'
    pdf.output(pdf_file_path)
    print(f'PDF generated successfully: {pdf_file_path}')

if __name__ == '__main__':
    create_pdf()