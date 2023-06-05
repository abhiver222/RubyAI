import openai
import os

def get_gpt3_completion(prompt, temperature=0.2, max_tokens=1000, num_generations=1):

    print('Sending request to GPT-3')
    openai.api_key = os.getenv('OPENAI_API_KEY')
    r = openai.Completion.create(model="text-davinci-003",
                                 temperature=temperature,
                                 n=num_generations,
                                 max_tokens=max_tokens)
    answer = r.choices[0]['text']
    response = {'answer': answer}
    return response

def get_chatgpt_completion(self, system_prompt, chat_prompt, temperature=0.2, num_generations=1, max_tokens=1000):
  chat_messages = self.create_chat_prompt(system_prompt, chat_prompt)
  openai.api_key = os.getenv('OPENAI_API_KEY')
  print('Sending request to GPT-4')
  r = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                   messages=chat_messages,
                                   temperature=temperature,
                                   n=num_generations,
                                   max_tokens=max_tokens)
  answer = r.choices[0]["message"]["content"].strip()
  response = {'answer': answer}
  return response

def get_gpt4_completion(self, system_prompt, chat_prompt, temperature=0.2, num_generations=1, max_tokens=1000):
  chat_messages = self.create_chat_prompt(system_prompt, chat_prompt)
  openai.api_key = os.getenv('OPENAI_API_KEY')
  print('Sending request to GPT-4')
  r = openai.ChatCompletion.create(model="gpt-4-32k",
                                   messages=chat_messages,
                                   temperature=temperature,
                                   n=num_generations,
                                   max_tokens=max_tokens)
  answer = r.choices[0]["message"]["content"].strip()
  response = {'answer': answer}
  return response

def create_chat_prompt(self, system_prompt, chat_prompt):
    return [{
      "role": "system",
      "content": system_prompt
    }, {
      "role": "user",
      "content": chat_prompt
    }]