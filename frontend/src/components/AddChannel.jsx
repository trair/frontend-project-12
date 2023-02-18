import { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { channelSchema } from '../schemas/index.js';

const isExistsChannelName = (channels, channelName) => channels.find((channel) => channel.name === channelName);

const AddChannel = ({ socket }) => {
  const [showModal, setShowModal] = useState();
  const { channels } = useSelector((state) => state.channels);
  const toggleModal = () => setShowModal(!showModal);

  const { values, handleChange, handleSubmit, errors, isValid } = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema,
    onSubmit: ({ channelName }, actions ) => {
      if (isExistsChannelName(channels, channelName)) {
        actions.setFieldError('channelName', 'Имя канало должно быть уникально!');
      } else {
        socket.emit('newChannel', { name: channelName });
        toggleModal();
      }
    }
  })

  return (
    <>
      <Button variant="outline-success" size="sm" onClick={toggleModal}>
        +
      </Button>
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Control
                className={ errors.channelName ? 'form-control is-invalid' : 'form-control' }
                id="channelName"
                type="text"
                value={values.channelName}
                placeholder="Введите имя канала"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Alert show={ !!errors.channelName } variant='danger'>{errors.channelName}</Alert>
            <ButtonGroup className="d-flex mb-2" >
              <Button type="button" variant="secondary" onClick={toggleModal}>
                Отменить
              </Button>
              <Button type="submit" variant="primary" disabled={!isValid}>
                Добавить
              </Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
