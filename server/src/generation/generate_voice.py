
from gpt import get_chatgpt_completion


class GenerateVoice(object):
    def generate(self, context):
        prompt = self.get_prompt(context)
        system_prompt = self.get_system_prompt()
        print("system_prompt", system_prompt)
        print("prompt", prompt)
        voice = get_chatgpt_completion(system_prompt, prompt, 0.75, 1)
        return voice[0]

    def get_system_prompt(self):
        system_prompt = """
        Given a description for day in the life on a good day at work for an employee, write a paragraph of text 
        for the companys brand voice. 
        """
        return system_prompt

    def get_prompt(self, context):
        prompt = f"""
        Remember, the companys mission is to {context['mission']}. Their motto is {context['motto']}.
        The companys name is {context['company_name']}. Keep it to at most 4-6 lines and don't use too much jargon. 

        Day in the life:
        {context['description']}
        """
        return prompt