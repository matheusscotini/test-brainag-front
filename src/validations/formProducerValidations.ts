import * as Yup from "yup";

export const formProducerValidations = Yup.object().shape({
	name: Yup.string()
		.required('Campo obrigatório'),
	cpf: Yup.string()	
		.required('Campo obrigatório')	
		.max(11, "Máximo 11 caracteres")	
		.test('invalid', 'CPF inválido', (value: any) => validateCPF(value)),
	farm_name: Yup.string()
		.required('Campo obrigatório'),
	state: Yup.string()
		.required('Campo obrigatório'),
	city: Yup.string()
		.required('Campo obrigatório'),
	total_area: Yup.number()
		.required('Campo obrigatório')
		.max(100, "Área total não pode ser maior que 100 Hectares")
		.positive("Valor deve ser maior ou igual a 0")
		.integer("Somente números inteiros"),
	total_arable_area: Yup.number()
		.required('Campo obrigatório')
		.positive("Valor deve ser maior ou igual a 0")
		.integer("Somente números inteiros"),
	total_vegetation_area: Yup.number()
		.required('Campo obrigatório')
		.positive("Valor deve ser maior ou igual a 0")
		.integer("Somente números inteiros")
		.when('total_area', {
			is: (b: any, c: any) => b && c,
			then: Yup.string()
			  .email('Informe o valor da área total')
		  }),
	crops: Yup.array()
		.required('Campo obrigatório'),
}); 


function validateCPF(cpf: string) {
    cpf = cpf?.replace(/\D/g, '');

    let sum;
    let rest;

    sum = 0;

    if (cpf === '00000000000') {
        return false;
    }

    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf?.substring(i - 1, i), 10) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
        rest = 0;
    }

    if (rest !== parseInt(cpf?.substring(9, 10), 10)) {
        return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf?.substring(i - 1, i), 10) * (12 - i);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
        rest = 0;
    }

    if (rest !== parseInt(cpf?.substring(10, 11), 10)) {
        return false;
    }

    return true;
}

