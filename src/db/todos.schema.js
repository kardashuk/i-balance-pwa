
const todoSchema = {
    'title': 'todo schema',
    'description': 'describes a simple todo',
    'version': 0,
    'type': 'object',
    'properties': {
        'name': {
            'type': 'string',
            'primary': true
        },
        'color': {
            'type': 'string'
        }
    },
    'required': ['color']
};

export default todoSchema;