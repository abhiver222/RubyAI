from generation.generate_message import GenerateMessage
from generation.generate_mission import GenerateMission
from models import Models

class Ruby(object):
    def __init__(self, db):
        self.db = db
        self.email_generator = GenerateMessage()
        self.mission_generator = GenerateMission()
        self.models = Models(db)

    '''
    generation_data: {name, companyname, industry, linkedin, website, bio, creativity, num_generations, mood, length, readability, medium}
    '''
    def generate_messages(self, data):
        print("Ruby is generating messages")
        # check if company and job description are in db
        if not self.models.ruby_configured:
            return None, "Configure job description and company info in Configure tab"

        # get data from db about company and JD
        company_data = self.models.get_company()
        job_description = self.models.get_job_description()

        # call the email generator with data
        messages = self.email_generator.generate(data, company_data, job_description)

        # store generation params in db
        generation_id = self.insert_generation(data)

        # store messages in db with generation id
        messages = self.insert_messages(messages, generation_id)

        return messages, "sucessfully generated messages"

    def upsert_job(self, data):
        return self.models.upsert_job(data)
    
    def upsert_company(self, data):
        return self.models.upsert_company(data)
    
    def insert_generation(self, data):
        return self.models.insert_generation(data)
    
    def insert_messages(self, messages, generation_id):
        return self.models.insert_messages(messages, generation_id)
    
    def get_company_info(self):
        return self.models.get_company()
    
    def get_job_description(self):
        return self.models.get_job_description()
    
    def print_db(self, table_name):
        table = self.db.table(table_name)
        print(table.all())
