/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import CardContact from '../card/CardContact';
import MyModal from '../modal/MyModal';
import ContactForm from '../contact/ContactForm';
import ContactService from '../../core/services/ContactService';
import { IContact } from '../../core/interfaces/ContactInterface';
import { ApplicationState } from '../../store';
import * as contactAction from '../../store/ducks/contacts/actions';

interface StateProps {
  list: IContact[];
}

interface DispatchProps {
  loadRequest: () => void;
}

type Props = StateProps & DispatchProps;


function LayoutContent(props: Props) {
  const { loadRequest, list } = props;
  /**
   * ABRE MODAL COM FORMULÁRIO
   */
  const [openModal, setOpenModal] = React.useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  /**
   * LIDA COM A ALTERAÇÃO DE DADOS DE UM CONTATO
   */
  const [contactData, setContactData] = React.useState({
    id: '', name: '', nickname: '', email: '', phone1: '', phone2: '',
  });
  const requestContact = async (id: string) => {
    const result = await ContactService.getContact(id);
    return result;
  };
  const handleIdContact = async (id: string) => {
    const { data } = await requestContact(id);
    setContactData({ ...data });
  };
  React.useEffect(() => {
    if (contactData.id !== '') handleModal();
  }, [contactData]);

  /**
   * BUSCA LISTA DE CONTATOS ATUALIZANDO O ESTADO NO REDUX
   */
  React.useEffect(() => {
    loadRequest();
  }, []);

  return (
    <div>
      {
        list.map((ct, index) => {
          const {
            id, name, nickname, email, phone1, phone2,
          } = ct;
          return (
            <CardContact
              key={index}
              id={id}
              name={name}
              nickname={nickname}
              email={email}
              phone1={phone1}
              phone2={phone2}
              setIdToUpdate={handleIdContact}
            />
          );
        })
      }
      <div>
        <MyModal title="Novo Contato" open={openModal} handleClose={handleModal}>
          <ContactForm
            data={contactData}
            handleCloseModal={handleModal}
          />
        </MyModal>
      </div>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  list: state.contacts.list,
});

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(contactAction, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(LayoutContent);
