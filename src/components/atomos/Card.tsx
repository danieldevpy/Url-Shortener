import * as React from 'react';
import {Card, CardHeader, CardContent, Box} from '@mui/material';


interface CardProps {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

export default function CardBox(props: CardProps) {

  return (
    <Card className='card' sx={{ maxWidth: 345, maxHeight: 345, backgroundColor: "#16182a"  }}>
      <CardHeader
        sx={{color: 'white', marginTop: 5, padding: 0}}
        title={
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <label>{props.title.split(' ')[0]}</label>
          <label style={{fontSize: 18}}>{props.title.split(' ')[1]}</label>
        </Box>}
        subheader={props.subTitle}
      />
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  );
}