import { useFormik } from 'formik';
import axios from 'axios';

const onSubmit = async ({ username, password }, actions) => {
  try {
    const data = await axios.post('/api/v1/login', { username, password });
    console.log(data);
  } catch (error) {
    if (error.response.status === 401) {
      actions.resetForm();
      actions.setErrors({ authError: 'Неверное имя пользователя или пароль' });
    }
  }
};

const Login = () => {
  const schema = yup.object().shape({
    username: yup.string().required('Пожалуйста, заполните это поле'),
    password: yup.string().required('Пожалуйста, заполните это поле'),
  });

  const { values, handleChange, handleSubmit, errors, isSubmitting } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit,
  });

  console.log(errors);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src="./images/enter.jpg"
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <form
                onSubmit={handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    className={
                      errors.username
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={values.username}
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Ваш ник</label>
                  {errors.username ? (
                    <div className="invalid-tooltip">{errors.username}</div>
                  ) : null }
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    id="password"
                    className={
                      errors.password
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={values.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="pasword">Пароль</label>
                  {errors.password ? (
                    <div className="invalid-tooltip">{errors.password}</div>
                  ) : null }
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                  disabled={isSubmitting}
                >
                  Войти
                </button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
