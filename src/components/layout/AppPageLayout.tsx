/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box, makeStyles, Container, Grid, Button, Theme, Hidden,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { SnackbarProvider } from 'notistack';
import { connect } from 'react-redux';
import bg1 from '../../assets/img/telephone-street.png';
import CardPerfil from '../card/CardPerfil';
import LayoutContent from './LayoutContent';
import MyModal from '../modal/MyModal';
import ContactForm from '../contact/ContactForm';
import { ApplicationState } from '../../store';
import { IContact } from '../../core/interfaces/ContactInterface';

const appPageLayoutStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    background: 'white',
    overflowY: 'scroll',
  },
  contentTopWrapper: {
    height: '320px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '180px',
    },
  },
  contentTop: {
    backgroundImage: `url(${bg1})`,
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
  },
  contentBodyWrapper: {
    position: 'relative',
    bottom: '52px',
  },
  sectionTop: {
    height: '56px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: '16px 0',
    },
    '& button': {
      width: '190px',
      background: '#0478A1',
      color: '#FFFFFF',
      textTransform: 'lowercase',
      opacity: '0.92',
    },
    '& button:hover': {
      background: '#518393',
    },
  },
  sectionTopChildLeft: {
    width: '100%',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  sectionTopChildRight: {
    width: '100%',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  description: {
    color: '#D0A43B',
    fontSize: '16px',
    fontWeight: 200,
    position: 'relative',
    top: '16px',
  },
  listCont: {
    color: '#D0A43B',
    fontSize: '32px',
    fontWeight: 600,
    margin: '0 8px',
  },
}));

interface StateProps {
  list: IContact[];
}

type Props = StateProps;

function AppPageLayout(props: Props) {
  const { list } = props;
  const [open, setOpen] = React.useState(false);
  const handleSetOpen = () => {
    setOpen(!open);
  };
  const classes = appPageLayoutStyles(props);
  return (
    <SnackbarProvider maxSnack={3}>
      <Box className={classes.root}>
        <Box className={classes.contentTopWrapper}>
          {/* Header */}
          <Box className={classes.contentTop} />
        </Box>
        <Box className={classes.contentBodyWrapper}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid container item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <CardPerfil />
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12} md={9} lg={9} xl={9}>
                <Hidden smDown>
                  <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
                    <Box className={classes.sectionTop}>
                      <Box className={classes.sectionTopChildLeft}>
                        <Button onClick={handleSetOpen} variant="outlined" color="secondary">
                          Adicionar contato
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Hidden>
                <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                  <Box className={classes.sectionTopChildRight}>
                    <Box style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                      <span className={classes.description}>Cadastrados</span>
                      <span className={classes.listCont}>{list.length}</span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                  {/* CONTEÚDO PRINCIPAL */}
                  <LayoutContent />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Hidden mdUp>
          <Box position="fixed" zIndex="4" bottom="16px" left="16px">
            <Button
              onClick={handleSetOpen}
              style={{
                height: '52px',
                width: '52px',
                borderRadius: '50%',
                background: '#0478A1',
                minWidth: 'auto',
                border: '2px solid #036AAA',
                boxShadow: '0px 15px 25px rgba(32, 49, 91, 0.05), 0px 5px 7px rgba(52, 64, 77, 0.05), 0px 30px 30px rgba(52, 64, 77, 0.03)',
              }}
            >
              <PersonAddIcon style={{ color: '#FFFFFF', fontSize: '20px' }} />
            </Button>
          </Box>
        </Hidden>
      </Box>
      <div>
        <MyModal title="Novo Contato" open={open} handleClose={handleSetOpen}>
          <ContactForm handleCloseModal={handleSetOpen} />
        </MyModal>
      </div>
    </SnackbarProvider>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  list: state.contacts.list,
});

export default connect(mapStateToProps)(AppPageLayout);
