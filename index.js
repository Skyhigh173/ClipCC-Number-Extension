const { Extension, type, api } = require('clipcc-extension');

class MyExtension extends Extension {
    
    /* menu (thanks for 南海蒟蒻) */
    makeMenu (b, menus) {
        const menu = [];
        for (const item of menus) {
            menu.push({
                messageId: `${b}.menu.${item}`,
                value: item
            });
        }
        return menu;
    }

    /* rad trig */
    trig(name,x){
        if(name == 'sin') return Math.sin(x);
        if(name == 'cos') return Math.cos(x);
        if(name == 'tan') return Math.tan(x);
        if(name == 'sinh') return Math.sinh(x);
        if(name == 'cosh') return Math.cosh(x);
        if(name == 'tanh') return Math.tanh(x);
        if(name == 'asin') return Math.asin(x);
        if(name == 'acos') return Math.acos(x);
        if(name == 'atan') return Math.atan(x);
        if(name == 'asinh') return Math.asinh(x);
        if(name == 'acosh') return Math.acosh(x);
        if(name == 'atanh') return Math.atanh(x);
        return 0;
    }
    /* BigInt */
    BigIntCnv(k){
        let result = 0n;
        try {
            result = BigInt(k)
        } catch(error) {
            console.error(error);
        }
        return result;
    }
    BigIntPlus(a, b){ 
        let A = this.BigIntCnv(a); let B = this.BigIntCnv(b);
        return (A + B).toString();
    }
    BigIntMinus(a, b){
        let A = this.BigIntCnv(a); let B = this.BigIntCnv(b);
        return (A - B).toString();
    }
    BigIntMultiply(a, b){
        let A = this.BigIntCnv(a); let B = this.BigIntCnv(b);
        return (A * B).toString();
    }
    BigIntDivide(a, b){
        let A = this.BigIntCnv(a); let B = this.BigIntCnv(b);
        return (A / B).toString();
    }
    BigIntMod(a, b){
        let A = this.BigIntCnv(a); let B = this.BigIntCnv(b);
        return (A % B).toString();
    }
    BigIntExpo(a, b){
        let A = this.BigIntCnv(a); let B = this.BigIntCnv(b);
        let result = '1';
        try {
            result = (A ** B).toString();
        } catch(error) {
            console.error(error);
        }
        return result;
    }
    onInit() {
        api.addCategory({
            categoryId: 'skyhigh173.number.category',
            messageId: 'skyhigh173.number.category',
            color: '#77AEF7'
        });

        // math const
        api.addBlock({
            opcode: 'skyhigh173.number.getConst',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.getConst',
            categoryId: 'skyhigh173.number.category',
            param: {
                MENU: {
                    type: type.ParameterType.STRING,
                    default: 'pi',
                    menu: this.makeMenu('skyhigh173.number.getConst',['pi','e','phi','sqrt2'])
                }
            },
            function: args => {
                let MENU = args.MENU;
                switch(MENU) {
                    case 'pi': return Math.PI; break;
                    case 'e': return Math.E; break;
                    case 'phi': return 1.6180339887498948482; break;
                    case 'sqrt2': return Math.SQRT2; break;
                    default: console.log('NE error: get Const menu error'); return 0;
                }
            }
        });
        // rad trig functions
        api.addBlock({
            opcode: 'skyhigh173.number.trig',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.trig',
            categoryId: 'skyhigh173.number.category',
            param: {
                MENU: {
                    type: type.ParameterType.STRING,
                    default: 'sin',
                    menu: this.makeMenu('skyhigh173.number.trig',['sin','cos','tan','sinh','cosh','tanh','asin','acos','atan','asinh','acosh','atanh'])
                },
                X: {
                    type: type.ParameterType.NUMBER,
                    default: '1'
                },
            },
            function: args => {
                return this.trig(args.MENU,args.X);
            }
        });
        // atan2
        api.addBlock({
            opcode: 'skyhigh173.number.atan2',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.atan2',
            categoryId: 'skyhigh173.number.category',
            param: {
                X: {
                    type: type.ParameterType.NUMBER,
                    default: 50
                },
                Y: {
                    type: type.ParameterType.NUMBER,
                    default: 50
                }
            },
            function: args => {
                return Math.atan2(args.Y,args.X);
            }
        });
        // log
        api.addBlock({
            opcode: 'skyhigh173.number.log',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.log',
            categoryId: 'skyhigh173.number.category',
            param: {
                B: {
                    type: type.ParameterType.NUMBER,
                    default: 2
                },
                N: {
                    type: type.ParameterType.NUMBER,
                    default: 1024
                }
            },
            function: args => {
                return Math.log(args.N) / Math.log(args.B);
            }
        });
        // min max
        api.addBlock({
            opcode: 'skyhigh173.number.minmax',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.minmax',
            categoryId: 'skyhigh173.number.category',
            param: {
                MENU: {
                    type: type.ParameterType.STRING,
                    default: 'min',
                    menu: this.makeMenu('skyhigh173.number.minmax',['min','max'])
                },
                A: {
                    type: type.ParameterType.NUMBER,
                    default: 50
                },
                B: {
                    type: type.ParameterType.NUMBER,
                    default: 100
                }
            },
            function: args => {
                if(args.MENU == 'min') return Math.min(args.A,args.B);
                if(args.MENU == 'max') return Math.max(args.A,args.B);
            }
        });
        // other math func
        api.addBlock({
            opcode: 'skyhigh173.number.func',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.func',
            categoryId: 'skyhigh173.number.category',
            param: {
                MENU: {
                    type: type.ParameterType.STRING,
                    default: 'sign',
                    menu: this.makeMenu('skyhigh173.number.func',['sign','cbrt','trunc'])
                },
                N: {
                    type: type.ParameterType.NUMBER,
                    default: 50
                }
            },
            function: args => {
                if(args.MENU == 'sign') return Math.sign(args.N);
                if(args.MENU == 'cbrt') return Math.cbrt(args.N);
                if(args.MENU == 'trunc') return Math.trunc(args.N);
            }
        });
        // a + b
        api.addBlock({
            opcode: 'skyhigh173.number.bigIntPlus',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.bigIntPlus',
            categoryId: 'skyhigh173.number.category',
            param: {
                A: {
                    type: type.ParameterType.STRING,
                    default: '50'
                },
                B: {
                    type: type.ParameterType.STRING,
                    default: '2'
                }
            },
            function: args => {
                return this.BigIntPlus(args.A, args.B);
            }
        });
        // a - b
        api.addBlock({
            opcode: 'skyhigh173.number.bigIntMinus',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.bigIntMinus',
            categoryId: 'skyhigh173.number.category',
            param: {
                A: {
                    type: type.ParameterType.STRING,
                    default: '50'
                },
                B: {
                    type: type.ParameterType.STRING,
                    default: '2'
                }
            },
            function: args => {
                return this.BigIntMinus(args.A, args.B);
            }
        });
        // a * b
        api.addBlock({
            opcode: 'skyhigh173.number.bigIntMultiply',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.bigIntMultiply',
            categoryId: 'skyhigh173.number.category',
            param: {
                A: {
                    type: type.ParameterType.STRING,
                    default: '50'
                },
                B: {
                    type: type.ParameterType.STRING,
                    default: '2'
                }
            },
            function: args => {
                return this.BigIntMultiply(args.A, args.B);
            }
        });
        // a / b
        api.addBlock({
            opcode: 'skyhigh173.number.bigIntDivide',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.bigIntDivide',
            categoryId: 'skyhigh173.number.category',
            param: {
                A: {
                    type: type.ParameterType.STRING,
                    default: '50'
                },
                B: {
                    type: type.ParameterType.STRING,
                    default: '2'
                }
            },
            function: args => {
                return this.BigIntDivide(args.A, args.B);
            }
        });
        // a ^ b
        api.addBlock({
            opcode: 'skyhigh173.number.bigIntExpo',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.bigIntExpo',
            categoryId: 'skyhigh173.number.category',
            param: {
                A: {
                    type: type.ParameterType.STRING,
                    default: '50'
                },
                B: {
                    type: type.ParameterType.STRING,
                    default: '2'
                }
            },
            function: args => {
                return this.BigIntExpo(args.A, args.B);
            }
        });
        // a mod b
        api.addBlock({
            opcode: 'skyhigh173.number.bigIntMod',
            type: type.BlockType.REPORTER,
            messageId: 'skyhigh173.number.bigIntMod',
            categoryId: 'skyhigh173.number.category',
            param: {
                A: {
                    type: type.ParameterType.STRING,
                    default: '50'
                },
                B: {
                    type: type.ParameterType.STRING,
                    default: '3'
                }
            },
            function: args => {
                return this.BigIntMod(args.A, args.B);
            }
        });
    }

    onUninit() {
        api.removeCategory('skyhigh173.number.category')
    }
}

module.exports = MyExtension;
