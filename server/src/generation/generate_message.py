from gpt import get_chatgpt_completions_parallel

class GenerateMessage(object):
    
    def generate(self, generation_data, company_data, job_description):
        
        temperature = int(generation_data['creativity'])
        num_generations = generation_data['num_generations']


        system_prompt, prompt = self.get_prompt(generation_data, company_data, job_description)

        tokens = 1000
        if generation_data['language'] in ['hindi', 'chinese']:
            tokens = 2000

        messages = get_chatgpt_completions_parallel(system_prompt, prompt, temperature, num_generations, tokens)

        return messages
    
    def get_prompt(self, generation_data, company_data, job_description):
        system_prompt = f"""You are a recruiter for {company_data["company_name"]} in {generation_data['industry']} industry and 
                    are writing an message to a candidate for a {job_description['position']} position at {company_data['company_name']}. 
                    The companys mission is {company_data['mission']} and its motto is {company_data['motto']}. The company's brand voice is {company_data['brand_voice']}."""
        
        prompt = f"""Write a {self.get_message_type(generation_data['length'], generation_data['medium'])} in the companys brand voice for this job description                   
                    position: {job_description['position']}
                    responsibilities: {job_description['responsibilities']}
                    skills: {job_description['skills']}
                    seniority: {job_description['seniority']}
                    location: {job_description['location']}
                    
                    The candidate's name is {generation_data['name']} and their linkedin is {generation_data['linkedin_url']}.
                    They currently work in {generation_data['candidate_company']} industry and their website is {generation_data['company_url']}.
                    Their bio is {generation_data['bio']}.

                    Write a {self.get_message_type(generation_data['length'], generation_data['medium'])}.
                    in a {generation_data['mood']} mood to the candidate to get them to apply to the job. Talk about the benefits of working at {company_data["company_name"]}.
                    Make the message {generation_data['readability']} to read and use flesh kinkaid readability scores to measure.
                    ease of reading. Only return the message no need to return the score. Write the message in {generation_data['language']} language.
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

    