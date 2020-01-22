/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Card, CardContent, makeStyles, Box, Button, Divider, Collapse, Grid,
} from '@material-ui/core';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import { withSnackbar } from 'notistack';
import * as contactAction from '../../store/ducks/contacts/actions';
import { ISnackbar, variantSnackbar } from '../snackbar/SnackBar';
import ContactService from '../../core/services/ContactService';

interface IButtonStyles {
  htmlColor: string;
  icon: any;
  onClick?: () => void;
}

const buttonStyles = makeStyles(() => ({
  root: {
    height: '28px',
    minHeight: '28px',
    width: '28px',
    minWidth: '28px',
    margin: '0 8px',
    backgroundColor: ({ htmlColor }: IButtonStyles) => htmlColor,
    '& svg': {
      color: '#FFFFFF',
      fontSize: '16px',
    },
  },
}));

const CustomButton = (props: IButtonStyles) => {
  const { icon, onClick } = props;
  const classes = buttonStyles(props);
  return (
    <Button variant="contained" color="primary" onClick={onClick} className={classes.root}>
      { icon }
    </Button>
  );
};

const cardContactStyles = makeStyles(() => ({
  root: {
    height: 'auto',
    width: '100%',
    background: '#FFFFFF',
    boxShadow: '0px 15px 25px rgba(32, 49, 91, 0.05), 0px 5px 7px rgba(52, 64, 77, 0.05), 0px 30px 30px rgba(52, 64, 77, 0.03)',
    borderRadius: '4px',
    margin: '16px 0',
  },
  contentWrapper: {
    padding: '16px 16px !important',
  },
  headerCard: {
    width: '100%',
  },
  headerContentLeft: {
    width: '100%',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  iconWrapper: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  containerIcon: {
    backgroundColor: '#0478A1',
    boxShadow: '0px 15px 25px rgba(32, 49, 91, 0.05), 0px 5px 7px rgba(52, 64, 77, 0.05), 0px 30px 30px rgba(52, 64, 77, 0.03)',
    border: '2px solid #036AAA',
    height: '64px',
    width: '64px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& span': {
      color: '#FFFFFF',
      fontSize: '40px',
      position: 'relative',
      top: '4px',
    },
  },
  titleWrapper: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: '16px',
    '& span': {
      fontWeight: 500,
      fontSize: '20px',
      color: '#455566',
    },
  },
  headerContentRight: {
    width: '20%',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  favoriteContact: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      height: 'auto',
      minHeight: 'auto',
      width: 'auto',
      minWidth: 'auto',
      margin: '0',
      padding: '0',
      '& :hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  dividerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  fieldContainer: {
    padding: '22px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  fieldContainerChild: {
    width: '80%',
  },
  fieldWrapper: {
    width: '100%',
    '& svg': {
      fontSize: '16px',
      position: 'relative',
      top: '2px',
      margin: '0 4px',
      color: '#20315B',
    },
    '& span': {
      fontSize: '16px',
      margin: '0 4px',
      color: '#20315B',
    },
  },
  buttonsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttonsContainerChild: {
    width: 'auto',
  },
}));

interface IProps {
  handleModal?: (id?: string | null) => void;
  setIdToUpdate: (id: string) => void;
}

interface OwnProps {
  id: string;
  name?: string;
  nickname?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
}

interface DispatchProps {
  loadRequest: () => void;
}

type Props = IProps & OwnProps & DispatchProps & ISnackbar;

function CardContact(props: Props) {
  const {
    id, name, nickname, email, phone1, phone2, setIdToUpdate, enqueueSnackbar, loadRequest,
  } = props;
  const classes = cardContactStyles(props);
  const [expanded, setExpanded] = React.useState(false);

  const handleCollapse = () => setExpanded(!expanded);
  const openForm = () => {
    setIdToUpdate(id);
  };

  const handleRemove = async () => {
    const { success } = await ContactService.removeContact(id);
    if (success) {
      enqueueSnackbar('Contato removido com sucesso!', variantSnackbar('success'));
      loadRequest();
    } else enqueueSnackbar('Erro ao remover contato!', variantSnackbar('error'));
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.contentWrapper}>
        <div className={classes.headerCard}>
          <div className={classes.headerContentLeft}>
            <div className={classes.iconWrapper}>
              <Box className={classes.containerIcon}>
                <span>{name?.substring(0, 1).toUpperCase()}</span>
              </Box>
            </div>
            <Box className={classes.titleWrapper}>
              <div>
                <span>{name}</span>
              </div>
            </Box>
          </div>
          {/* <div className={classes.headerContentRight}>
            <div className={classes.favoriteContact}>
              <Button>
                <StarBorderIcon />
              </Button>
            </div>
          </div> */}
        </div>
        <Box margin="16px 0">
          <Box className={classes.dividerWrapper}>
            <div style={{ width: '80%' }}>
              <Divider style={{ width: '100%' }} />
            </div>
          </Box>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box>
              <div className={classes.fieldContainer}>
                <div className={classes.fieldContainerChild}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box className={classes.fieldWrapper}>
                        <PersonIcon />
                        <span>{name}</span>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box className={classes.fieldWrapper}>
                        <InsertEmoticonIcon />
                        <span>{nickname}</span>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box className={classes.fieldWrapper}>
                        <AlternateEmailIcon />
                        <span>{email}</span>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Box className={classes.fieldWrapper}>
                        <PhoneIcon />
                        <span>{phone1}</span>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Box className={classes.fieldWrapper}>
                        <PhoneIcon />
                        <span>{phone2}</span>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Box>
          </Collapse>
          <Box className={classes.dividerWrapper}>
            <div style={{ width: '80%' }}>
              <Divider style={{ width: '100%' }} />
            </div>
          </Box>
        </Box>
        <Box className={classes.buttonsContainer}>
          <div className={classes.buttonsContainerChild}>
            <CustomButton icon={<CodeIcon style={{ transform: 'rotate(90deg)' }} />} htmlColor="green" onClick={handleCollapse} />
            <CustomButton icon={<CreateIcon />} htmlColor="#115293" onClick={() => openForm()} />
            <CustomButton icon={<DeleteIcon />} htmlColor="#9A0036" onClick={handleRemove} />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(contactAction, dispatch);

export default connect(null, mapDispatchProps)(withSnackbar(CardContact));
