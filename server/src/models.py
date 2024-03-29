from tinydb import Query
import uuid
from readability import Readability
import time
import sys

class Models(object):
    def __init__(self, db):
        self.db = db

    def insert(self,table_name, document):
        table = self.db.table(table_name)
        table.insert(document)

    def get_by_id(self,table_name, document_id):
        table = self.db.table(table_name)
        User = Query()
        result = table.search(User.id == document_id)
        return result[0] if result else None
    
    def update_by_id(self, table_name, document_id, document):
        table = self.db.table(table_name)
        Entry = Query()
        table.update(document, Entry.id == document_id)

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

    def insert_new_with_id(self, table_name, data):
        table = self.db.table(table_name)
        data['id'] = str(uuid.uuid4())
        table.insert(data)
        return data['id']

    def get_single_entry(self,table_name):
        table = self.db.table(table_name)
        Entry = Query()
        result = table.search(Entry.id.exists())
        return result[0] if result else None


    def upsert_company(self,data):
        return self.insert_or_update_single('company', data)

    def upsert_job(self,data):
        return self.insert_or_update_single('job', data)
    
    def insert_generation(self,data):
        return self.insert_new_with_id('generation', data)
    
    def insert_message(self,data):
        return self.insert_new_with_id('message', data)
    
    def insert_messages(self,messages, generation_data):
        inserted_messages = []
        for message in messages:
            r = Readability(message)    
            fk = r.flesch()
            readability = {"score": fk.score, "grade_level": fk.grade_levels, "ease": fk.ease}
            message_data = {"content": message, "generation_data": generation_data, "feedback": '', "readability": readability, "generated_at": time.time()}
            message_id = self.insert_message(message_data)
            inserted_messages.append({'message':message, 'message_id':message_id, 'readability': readability})
        return inserted_messages
        

    """
    for the demo, we assume only one company
    """
    def get_company(self):
        return self.get_single_entry('company')
    
    """
    for the demo, we assume only one job description
    """
    def get_job_description(self):
        return self.get_single_entry('job')
    
    def ruby_configured(self):
        return self.get_company() is not None and self.get_job_description() is not None

    def insert_feedback(self, feedback_data):
        message_id = feedback_data['message_id']
        if not message_id:
            return None
        message = self.get_by_id('message', message_id)
        if not message:
            return None
        feedback = feedback_data['feedback']
        if not feedback:
            return None
        message['feedback'] = feedback
        print("inserting feedback", message_id, message)
        self.update_by_id('message', message_id, message)
        return message_id
    
    def send_message(self, message_data):
        message_id = message_data['message_id']
        if not message_id:
            return None
        message = self.get_by_id('message', message_id)
        if not message:
            return None
        message['sent'] = True
        message['sent_at'] = time.time()
        print("sending message", message_id, message)
        self.update_by_id('message', message_id, message)
        return message_id

    def get_messages(self):
        table = self.db.table('message')
        sorted_messages = sorted(table.all(), key=lambda x: x.get('generated_at', -sys.maxsize), reverse=True)
        return sorted_messages

