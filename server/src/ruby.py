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

        # get data from db about company and JD
        company_data = self.models.get_company()
        job_description = self.models.get_job_description()

        if not company_data or not job_description:
            return None, "Configure job description and company info in Configure tab"

        # call the email generator with data
        messages = self.email_generator.generate(data, company_data, job_description)

        # store generation params in db
        generation_id = self.insert_generation(data)
        print("Generation id: " + generation_id)

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
        print("Printing table: " + table_name)
        table = self.db.table(table_name)
        print(table.all())

    def insert_feedback(self, feedback_data):
        return self.models.insert_feedback(feedback_data)
    
    def send_message(self, message):
        return self.models.send_message(message)
