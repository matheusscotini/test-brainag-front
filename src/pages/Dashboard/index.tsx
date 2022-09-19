import { Divider, Grid, GridItem, Spinner, Stack, Text, useColorMode } from "@chakra-ui/react";
import { useQueries } from "react-query";
import PieGraph from "../../components/charts/pie-graph";
import AppBaseLayout from "../../components/layouts/AppBaseLayout";
import ReportsHttpService from "../../services/services/http/reports-http.service";

const Dashboard: React.FC = () => {
    const { colorMode } = useColorMode();
    const results: any = useQueries([
        { queryKey: ['totalFarms', 0], queryFn: async () => await ReportsHttpService.getTotalFarms() },
        { queryKey: ['totalHectares', 1], queryFn: async () => await ReportsHttpService.getTotalHectares() },
        { queryKey: ['totalArableArea', 2], queryFn: async () => await ReportsHttpService.getTotalArableArea() },
        { queryKey: ['totalFailureSAP', 3], queryFn: async () => await ReportsHttpService.getTotalFarms() },
        { queryKey: ['totalFinishedSAP', 4], queryFn: async () => await ReportsHttpService.getTotalFarms() },
    ])

    const charts: any = useQueries([
        { queryKey: ['farmsByState', 0], queryFn: async () => await ReportsHttpService.getTotalFarmsByState() },
        { queryKey: ['typeArea', 1], queryFn: async () => await ReportsHttpService.getTotalTypeArea() },
    ])

    const dashboardItems = [
        { title: 'Total de fazendas', indexArrayResult: 0 },
        { title: 'Área total', indexArrayResult: 1 },
        { title: 'Área áravel total', indexArrayResult: 2 },
    ];

    return (
        <AppBaseLayout>
            <Grid templateColumns='repeat(6, 12fr)' gap="4" m="4">
                {dashboardItems.map((item: any) => (
                    <>
                        <Stack direction={'column'}>
                            <GridItem w='100%'>
                                <Stack
                                    p="4"
                                    boxShadow="lg"
                                    borderWidth={1}
                                    borderRadius="sm"
                                    borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                                    background={'blue.800'}
                                    color="white"
                                >
                                    <Stack direction="row" alignItems="center">
                                        <Text fontWeight="semibold">{item.title}</Text>
                                    </Stack>

                                    <Text fontSize={'45px'}>
                                        {
                                            results[item.indexArrayResult].isFetching || results[item.indexArrayResult].isFetching
                                                ? <Spinner size="lg" /> : results[item.indexArrayResult]?.data?.data.total} {item.indexArrayResult !== 0 && 'ha'}</Text>
                                </Stack>


                            </GridItem>

                        </Stack>
                    </>
                ))}
            </Grid >
            <Divider />
            <Grid templateColumns='repeat(5, 8fr)' gap="4" m="4">
                <Grid flexDirection={'column'}>
                    <GridItem w='100%'>
                        <PieGraph title="Fazendas por estado" data={charts[0]?.data?.data} />
                    </GridItem>
                </Grid>

                <Grid>
                    <GridItem w='100%'>
                        <PieGraph title="Aréa disponível" data={charts[1]?.data?.data} />
                    </GridItem>
                </Grid>
            </Grid>
        </AppBaseLayout>
    )
}

export default Dashboard