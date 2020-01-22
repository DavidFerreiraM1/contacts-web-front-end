import React from 'react';
import {
  Card, CardContent, makeStyles, Box,
} from '@material-ui/core';
import ContactsIcon from '@material-ui/icons/Contacts';

const cardStyles = makeStyles(() => ({
  root: {
    height: 'auto',
    width: '260px',
    background: '#FFFFFF',
    boxShadow: '0px 15px 25px rgba(32, 49, 91, 0.05), 0px 5px 7px rgba(52, 64, 77, 0.05), 0px 30px 30px rgba(52, 64, 77, 0.03)',
    borderRadius: '4px',
  },
  contentWrapper: {
    padding: '16px 16px !important',
  },
  headerCard: {
    width: '100%',
  },
  iconWrapper: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  containerIcon: {
    backgroundColor: '#FA1022',
    boxShadow: '0px 15px 25px rgba(32, 49, 91, 0.05), 0px 5px 7px rgba(52, 64, 77, 0.05), 0px 30px 30px rgba(52, 64, 77, 0.03)',
    border: '2px solid #C20A25',
    height: '60px',
    width: '60px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      color: '#FFFFFF',
      fontSize: '42px',
    },
  },
  titleWrapper: {
    display: 'inline-block',
    verticalAlign: 'top',
    '& span': {
      fontWeight: 600,
      fontSize: '24px',
      color: '#455566',
      marginLeft: '8px',
    },
  },
  name: {
    '& p': {
      fontFamily: '"Indie Flower", cursive',
      fontSize: '18px',
      color: '#455566',
      margin: '0',
      marginLeft: '8px',
    },
  },
}));

export default function CardPerfil(props: any) {
  const classes = cardStyles(props);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.contentWrapper}>
        <div className={classes.headerCard}>
          <div className={classes.iconWrapper}>
            <Box className={classes.containerIcon}>
              <ContactsIcon />
            </Box>
          </div>
          <Box className={classes.titleWrapper}>
            <div>
              <span>Meus contatos</span>
            </div>
            <div className={classes.name}>
              <p>David Ferreira</p>
            </div>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}
