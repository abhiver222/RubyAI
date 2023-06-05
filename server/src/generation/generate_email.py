from gpt import get_gpt4_completion, get_chatgpt_completion, get_chatgpt_completions_parallel
# from generate import Generate

from abc import ABC, abstractmethod

class Generate(ABC):
    @abstractmethod
    def generate(self):
        pass
    
    @abstractmethod
    def get_prompt(self, prompt, context):
        pass

class GenerateEmail(Generate):
    
    def generate(self, generation_data, company_data, job_description):
        # validate data to have all properties
        # create email generation prompt with data
        temperature = int(generation_data['creativity'])
        num_generations = generation_data['num_generations']
        print("generationdata", generation_data)
        print("companydata", company_data)
        

        system_prompt, prompt = self.get_prompt(generation_data, company_data, job_description)
        print("system_prompt", system_prompt)
        print("prompt", prompt)

        # generate emails and store in DB
        emails = get_chatgpt_completions_parallel(system_prompt, prompt, temperature, num_generations)
        # add ids for emails into emails list in generation
        

        # return generated emails
        return emails
        # return []
    
    def get_prompt(self, generation_data, company_data, job_description):
        system_prompt = f"""You are a recruiter for {company_data["company_name"]} in {generation_data['industry']} industry and 
                    are writing an email to a candidate for a {job_description['position']} position at {company_data['company_name']}. 
                    The companys mission is {company_data['mission']} and its motto is {company_data['motto']}. """
        
        prompt = f"""Write a recruitment email for this job description:                    
                    position: {job_description['position']}
                    responsibilities: {job_description['responsibilities']}
                    skills: {job_description['skills']}
                    seniority: {job_description['seniority']}
                    location: {job_description['location']}
                    
                    The candidate's name is {generation_data['name']} and their linkedin is {generation_data['linkedin']}.
                    They currently work in {generation_data['company_name']} industry and their website is {generation_data['company_url']}.
                    Their bio is {generation_data['bio']}.

                    Write a {self.get_message_type(generation_data['length'], generation_data['medium'])} 
                    in a {generation_data['mood']} mood to the candidate to get them to apply to the job.
                    Make the email {generation_data['readability']} to read and use flesh kinkaid readability scores to measure
                    ease of reading. Only return the email no need to return the score.
                    """
        return (system_prompt, prompt)

    def get_message_type(self, length, medium):
        ret = length
        if medium == 'linkedin':
            ret += " linkedin post"
        elif medium == 'dm':
            ret += " direct message"
        else: # default to email
            ret += " email"
        return ret

    