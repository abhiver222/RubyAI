from generation.generate_email import GenerateEmail
from generation.generate_mission import GenerateMission
from models import Models

class Ruby(object):
    def __init__(self, db):
        self.db = db
        self.email_generator = GenerateEmail()
        self.mission_generator = GenerateMission()
        self.models = Models(db)

    '''
    generation_data: {name, companyname, industry, linkedin, website, bio, creativity, num_generations, mood, length, readability, medium}
    '''
    def generate_emails(self, data):
        # get json data

        # get data from db about company and JD
        company_data = self.models.get_company()
        job_description = self.models.get_job_description()

        # call the email generator with data
        emails = self.email_generator.generate(data, company_data, job_description)

        return emails

    def upsert_job(self, data):
        return self.models.upsert_job(data)
    
    def upsert_company(self, data):
        return self.models.upsert_company(data)