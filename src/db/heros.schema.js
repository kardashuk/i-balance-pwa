const heroSchema = {
    'title': 'hero schema',
    'description': 'describes a simple hero',
    'version': 1,
    'type': 'object',
    'properties': {
        'type':{
            'type': 'string',
            'default':'hero'
        },
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

export default heroSchema;
