/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React from 'react';
import {
  Box, Grid, Button, Theme,
} from '@material-ui/core';
import {
  Form, ErrorMessage, Formik,
} from 'formik';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SaveIcon from '@material-ui/icons/Save';
import { withSnackbar } from 'notistack';

import MyInputText from '../form/MyInputText';
import { IFormProps } from '../form/form';
import { contactSchema } from './contactSchema';
import { IContact } from '../../core/interfaces/ContactInterface';
import ContactService from '../../core/services/ContactService';
import { ISnackbar, variantSnackbar } from '../snackbar/SnackBar';
import * as contactAction from '../../store/ducks/contacts/actions';
import { formatePhone } from '../../core/utils/formatDataToSubmit';

const contactFormStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '640px',
    height: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  footerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '16px 0',
    '& button > span': {
      position: 'relative',
      top: '2px',
      textTransform: 'capitalize',
    },
    '& button': {
      '& svg': {
        position: 'relative',
        right: '4px',
        bottom: '2px',
        fontSize: '16px',
      },
    },
  },
  errorMsg: {
    color: 'red',
  },
}));

interface DispatchProps {
  loadRequest: () => void;
}

interface OwnProps {
  handleCloseModal: () => void
  data?: any;
}

type Props = OwnProps & IFormProps & ISnackbar & DispatchProps;

function ContactForm(props: Props) {
  const classes = contactFormStyles(props);

  const {
    data, handleCloseModal, enqueueSnackbar, loadRequest,
  } = props;
  const formValue = {
    name: '', nickname: '', email: '', phone1: '', phone2: '',
  };

  /**
   * MÉTODO PARA ATUALIZAÇÃO DE CONTATO
   */
  const handleUpdate = async (values: IContact) => {
    const formValues: IContact = {
      ...values,
      phone1: formatePhone(values.phone1),
      phone2: formatePhone(values.phone2),
    };
    const { success } = await ContactService.updateContact(values.id, formValues);
    if (success) {
      loadRequest();
      handleCloseModal();
      return enqueueSnackbar('Contato atualizado com sucesso', variantSnackbar('success'));
    }
    return enqueueSnackbar('Erro ao atualizar contato', variantSnackbar('error'));
  };

  /**
   * MÉTODO PARA CRIAÇÃO DE CONTATO
   */
  const handleCreate = async (values: IContact) => {
    const formValues: IContact = {
      ...values,
      phone1: formatePhone(values.phone1),
      phone2: formatePhone(values.phone2),
    };
    const { success } = await ContactService.createContact(formValues);
    if (success) {
      loadRequest();
      handleCloseModal();
      return enqueueSnackbar('Contato criado com sucesso', variantSnackbar('success'));
    }
    return enqueueSnackbar('Erro ao criar contato', variantSnackbar('error'));
  };

  return (
    <div className={classes.root}>
      <Box>
        <Formik
          initialValues={data !== undefined ? data : formValue}
          onSubmit={
            (values) => (data !== undefined ? handleUpdate(values) : handleCreate(values))
        }
          validationSchema={contactSchema}
        >
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={6}>
                <MyInputText id="name" name="name" label="Nome + sobrenome" variant="standard" adornmentText={<PersonIcon style={{ fontSize: '14px', color: '#20315B' }} />} />
                <ErrorMessage name="name" render={(msg) => <span className={classes.errorMsg}>{msg}</span>} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MyInputText id="nickname" name="nickname" label="Apelido" variant="standard" adornmentText={<InsertEmoticonIcon style={{ fontSize: '14px', color: '#20315B' }} />} />
                <ErrorMessage name="nickname" render={(msg) => <span className={classes.errorMsg}>{msg}</span>} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MyInputText id="email" name="email" label="Email" variant="standard" adornmentText={<AlternateEmailIcon style={{ fontSize: '14px', color: '#20315B' }} />} />
                <ErrorMessage name="email" render={(msg) => <span className={classes.errorMsg}>{msg}</span>} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MyInputText id="phone1" name="phone1" mask="99 9 9999-9999" maskChar="" label="Nº Telefone" variant="standard" adornmentText={<PhoneIcon style={{ fontSize: '14px', color: '#20315B' }} />} />
                <ErrorMessage name="phone1" render={(msg) => <span className={classes.errorMsg}>{msg}</span>} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MyInputText id="phone2" name="phone2" mask="99 9 9999-9999" maskChar="" label="Nº Telefone adicional" variant="standard" adornmentText={<PhoneIcon style={{ fontSize: '14px', color: '#20315B' }} />} />
                <ErrorMessage name="phone2" render={(msg) => <span className={classes.errorMsg}>{msg}</span>} />
              </Grid>
            </Grid>
            <Box>
              <Box
                className={classes.footerContainer}
              >
                <Button type="submit" variant="contained" color="primary">
                  <SaveIcon />
                  <span>
                    {
                      data !== undefined ? ('Atualizar') : ('Salvar')
                    }
                  </span>
                </Button>
              </Box>
            </Box>
          </Form>
        </Formik>
      </Box>
    </div>
  );
}

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(contactAction, dispatch);


export default connect(null, mapDispatchProps)(withSnackbar(ContactForm));
