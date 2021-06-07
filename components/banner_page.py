from components.component import component

class banner_page(component):
    def __init__(self):
        super().__init__()
        self.state['content'] = []

    def render(self):
        styles = '''
            display:grid;
        '''

        html = '''
            <div style="{styles}">
                <div id="banner">Creepboards.com </div>
                <div id="content">{content}</div>
                <div id="footer">footer</div>
            </div>
        '''.format(
            styles = styles,
            content = self.state['content'].render()
        )
        return html