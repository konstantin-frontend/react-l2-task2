import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

function App() {
	const [steps, setSteps] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);
	console.log(typeof activeIndex, activeIndex);

	const renderContent = () => {
		return <div className={styles['steps-content']}>{data[activeIndex].content}</div>;
	};

	const renderSteps = () => {
		/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */
		const allSteps = data.map((item, index) => {
			return (
				<li
					className={
						styles['steps-item'] +
						' ' +
						(index === activeIndex ? styles.active : '') +
						' ' +
						(index <= activeIndex ? styles.done : '')
					}
					key={item.id}
					onClick={() => setActiveIndex(index)}
				>
					{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
					<button className={styles['steps-item-button']}>{index + 1}</button>
					{/* При клике на кнопку установка выбранного шага в качестве активного */}
					{item.title}
				</li>
			);
		});
		return <ul className={styles['steps-list']}>{allSteps}</ul>;
	};

	const renderNavigationButtons = () => {
		const isLastStep = () => {
			return activeIndex === data.length - 1;
		};

		return (
			<div className={styles['buttons-container']}>
				<button
					className={styles.button}
					disabled={activeIndex ? '' : 'disabled'}
					onClick={() => setActiveIndex(activeIndex - 1)}
				>
					Назад
				</button>
				<button
					className={styles.button}
					onClick={() =>
						isLastStep() ? setActiveIndex(0) : setActiveIndex(activeIndex + 1)
					}
				>
					{isLastStep() ? 'Начать сначала' : 'Далее'}
					{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
					{/* Или заменять всю кнопку в зависимости от условия */}
				</button>
			</div>
		);
	};

	// Можно задать 2 состояния — steps и activeIndex

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					{renderContent()}
					{renderSteps()}
					{renderNavigationButtons()}
				</div>
			</div>
		</div>
	);
}

export default App;
