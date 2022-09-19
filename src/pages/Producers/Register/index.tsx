
import { Button, Divider, FormControl, FormLabel, Grid, GridItem, Heading, HStack, Input, Select, Spacer, Text, useToast } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import AppBaseLayout from "../../../components/layouts/AppBaseLayout"
import { toastMessage } from "../../../constants/toastMessage";
import { IProducer } from "../../../interfaces/IProducer";
import ProducersHttpService from "../../../services/services/http/producers-http.service";
import { formProducerValidations } from "../../../validations/formProducerValidations";

const defaultValues = {
    name: "",
    cpf: "",
    farm_name: "",
    state: "SC",
    city: "",
    total_area: 0,
    total_arable_area: 0,
    total_vegetation_area: 0,
    crops: "",
}

const RegisterProducer: React.FC = () => {
    const navigate = useNavigate();
    const toast = useToast();
    let { id } = useParams();

    const title = id ? "Editar produtor" : "Novo produtor";

    const { data }: any = useQuery('prodsducer', async () => await ProducersHttpService.getProducer(id), { enabled: id ? true : false });

    useEffect(() => {
        if (typeof data?.data?.crops === "string") {
            data.data.crops = data?.data?.crops.split(',')
        }
    }, [data]);

    const saveMutation = useMutation(
        async (values: IProducer) => {
            if (id) {
                return await ProducersHttpService.update(+id, values);
            }

            return await ProducersHttpService.store(values);
        },
        {
            onError: (error: any) => {
                toastMessage.title = error.message;
                toastMessage.status = "error";

                toast(toastMessage);
            },
            onSuccess: () => {
                toastMessage.title = "Produtor salvo com sucesso";
                toastMessage.status = "success";

                toast(toastMessage);

                navigate('/producers');
            },
        }
    );

    return (
        <AppBaseLayout>
            <Grid w='100%' p={4}>
                <Heading as="h5" size="lg">{title}</Heading>
                <br />

                <Formik
                    enableReinitialize={true}
                    initialValues={id && data?.data ? data?.data : defaultValues}
                    validationSchema={() => formProducerValidations}
                    onSubmit={async (values: any, { setSubmitting }) => {
                        values.crops = values.crops.toString()
                        await saveMutation.mutateAsync(values);

                        setSubmitting(false);
                    }}
                >
                    {({ values, handleChange, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid templateColumns='repeat(3, 1fr)' gap="4" >
                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor='name'>Nome do produtor</FormLabel>
                                        <Input as={Field} type="text" name="name" placeholder="Nome do produtor" />
                                        <ErrorMessage
                                            name="name"
                                            render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                        />
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor='cpf'>CPF</FormLabel>
                                        <Input as={Field} type="text" name="cpf" placeholder="CPF" />
                                        <ErrorMessage
                                            name="cpf"
                                            render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                        />
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor='farmName'>Nome da fazenda</FormLabel>
                                        <Input as={Field} type="text" name="farm_name" placeholder="Nome da fazenda" />
                                        <ErrorMessage
                                            name="farm_name"
                                            render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                        />
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor='state'>Estado</FormLabel>
                                        <Select name="state" value={values.state} onChange={handleChange} placeholder='Selecione...'>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="PR">Paraná</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="SE">Sergipe</option>
                                        </Select>
                                        <ErrorMessage
                                            name="state"
                                            render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                        />
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor='state'>Cidade</FormLabel>
                                        <Input as={Field} type="text" name="city" placeholder="Cidade" />
                                        <ErrorMessage
                                            name="city"
                                            render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                        />
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor='total_area'>Área total em hectares da fazenda</FormLabel>
                                        <Input as={Field} type="number" name="total_area" placeholder="Área total em hectares da fazenda" />
                                        <ErrorMessage
                                            name="total_area"
                                            render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                        />
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor='total_arable_area'>Área agricultável em hectares</FormLabel>
                                        <Input as={Field} type="number" name="total_arable_area" placeholder="Área agricultável em hectares" />
                                        <ErrorMessage
                                            name="total_arable_area"
                                            render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                        />
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor='total_vegetation_area'>Área de vegetação em hectares</FormLabel>
                                        <Input as={Field} type="number" name="total_vegetation_area" placeholder="Área de vegetação em hectares" />
                                        <ErrorMessage
                                            name="total_vegetation_area"
                                            render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                        />
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor='crops'>Culturas plantadas</FormLabel>
                                        <Field as={Select} multiple={true} value={values.crops || []} name="crops" height="200">
                                            <option value="Aipim">Aipim</option>
                                            <option value="Batata">Batata</option>
                                            <option value="Milho">Milho</option>
                                            <option value="Tomate">Tomate</option>
                                            <option value="Morange">Morange</option>
                                            <option value="Abobrinha">Abobrinha</option>
                                            <option value="Cenoura">Cenoura</option>
                                            <option value="Melancia">Melancia</option>
                                            <option value="Arroz">Arroz</option>
                                        </Field>
                                        <ErrorMessage
                                            name="crops"
                                            render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                        />
                                    </FormControl>
                                </GridItem>
                            </Grid>
                            <Divider />
                            <br />
                            <HStack>
                                <Spacer />
                                <Button
                                    mt={40}
                                    type='submit'
                                    bg="brain.0"
                                    color="white"
                                    _hover={{ bg: "brain.200" }}
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    Salvar dados
                                </Button>
                            </HStack>
                        </Form>
                    )}
                </Formik>

            </Grid>
        </AppBaseLayout>
    )
}

export default RegisterProducer