import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { setValue, clearForm, FormData, submit } from 'features/formSlice';
import { clearQuiz } from 'features/quizSlice';
import { clearTimer } from 'features/timerSlice';
import CategoryInput from './components/CategoryInput';
import DifficultyInput from './components/DifficultyInput';
import AmountInput from './components/AmountInput';
import TypeInput from './components/TypeInput';
import './Form.css';

export type InputProps = {
  clickHandler: (e: React.MouseEvent) => void;
};

export default function Form() {
  const navigate = useNavigate(),
    dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(submit());
    dispatch(clearQuiz());
    dispatch(clearTimer());
    navigate('/quiz');
  };

  const handleOptionClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLOptionElement;
    const parent = target.parentNode as HTMLDivElement;
    const active = parent.querySelector('.active') as HTMLOptionElement;
    active.classList.remove('active');
    active.classList.add('inactive');
    target.classList.add('active');
    target.classList.remove('inactive');
    dispatch(
      setValue({
        name: parent.dataset.name as keyof FormData,
        value: target.value,
      })
    );
  };

  useEffect(() => {
    dispatch(clearForm());
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <AmountInput clickHandler={handleOptionClick} />
      <CategoryInput dispatch={dispatch} />
      <DifficultyInput clickHandler={handleOptionClick} />
      <TypeInput clickHandler={handleOptionClick} />
      <div className='input-container'>
        <input type='submit' value='Start quiz' className='form-control' />
      </div>
    </form>
  );
}
