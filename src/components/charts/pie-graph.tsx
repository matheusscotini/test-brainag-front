import { Text } from '@chakra-ui/react';
import React from 'react';
import { PieChart, Pie, Cell, LabelList } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface PieProps {
    title: String,
    data: []
}

const PieGraph = (props: PieProps) => {
    return (
        <>
            <Text fontWeight={'bold'} as="h5">{props.title}</Text>
            <PieChart width={300} height={300}>
                <Pie isAnimationActive={false} data={props.data} cx="50%" cy="50%" outerRadius={80} label dataKey={'value'}>
                    {
                        props?.data?.map((entry, index) => (
                            <>
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                <LabelList dataKey="name" position="top" />
                            </>
                        ))
                    }
                </Pie>
            </PieChart>
        </>
    );
}

export default PieGraph;
