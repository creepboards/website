from components.component import component

class text(component):
    def __init__(self, content):
        super().__init__()
        self.state['content'] = content

    def render(self):
        return self.state['content']