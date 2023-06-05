from tinydb import Query
import uuid

class Models(object):
    def __init__(self, db):
        self.db = db

    """
    maintains a single entry in the table
    """
    def insert_or_update_single(self, table_name, data):
        table = self.db.table(table_name)
        Entry = Query()
        existing_entry = table.search(Entry.id.exists())
        if existing_entry:
            table.update(data, Entry.id == existing_entry[0]['id'])
            return existing_entry[0]['id']
        else:
            data['id'] = str(uuid.uuid4())  # Add a random UUID as id
            table.insert(data)
            return data['id']

    def insert_new(self, table_name, data):
        table = self.db.table(table_name)
        data['id'] = str(uuid.uuid4())
        table.insert(data)
        return data['id']

    def get_entry(self,table_name):
        table = self.db.table(table_name)
        Entry = Query()
        result = table.search(Entry.id.exists())
        return result[0] if result else None


    def upsert_company(self,data):
        return self.insert_or_update_single('company', data)

    def upsert_job(self,data):
        return self.insert_or_update_single('job', data)
    
    def insert_generation(self,data):
        return self.insert_new('generation', data)
    
    def insert_email(self,data):
        return self.insert_new('email', data)
    
    def insert_emails(self,emails, generation_id):
        inserted_emails = []
        for email in emails:
            email_data = {"content": email, "generation_id": generation_id, "feedback": ''}
            email_id = self.insert_email(email_data)
            inserted_emails.append({'email':email, 'id':email_id})
        return inserted_emails
        

    """
    for the demo, we assume only one company
    """
    def get_company(self):
        return self.get_entry('company')
    
    """
    for the demo, we assume only one job description
    """
    def get_job_description(self):
        return self.get_entry('job')

    def insert(self,table_name, document):
        table = self.db.table(table_name)
        table.insert(document)

    def get_by_id(self,table_name, document_id):
        table = self.db.table(table_name)
        User = Query()
        result = table.search(User.id == document_id)
        return result[0] if result else None

