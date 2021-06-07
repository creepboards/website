from components.component import component

class root(component):
    def __init__(self):
        super().__init__()
        self.state['pages'] = []
        
    
    def render(self):
        book = ''
        for p in self.state['pages']:
            book += '''
                <div>
                    {page}
                </div>
            '''.format(page=p.render())

        html = '''
            <head>
                <style>{fonts}</style>
            </head>
            <body>
               {book} 
            </body>
        '''.format(
            fonts = self.get_snippet('css/fonts.css'),
            book = book
        )
        return html