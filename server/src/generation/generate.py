from abc import ABC, abstractmethod

class Generate(ABC):
    @abstractmethod
    def generate(self):
        pass
    
    @abstractmethod
    def get_prompt(self, prompt, context):
        pass

