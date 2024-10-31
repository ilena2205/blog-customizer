import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { SyntheticEvent, useRef, useState } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	onChange: (newStyle: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [formIsOpen, setFormIsOpen] = useState(false);
	const [state, setState] = useState(defaultArticleState);

	const toggleOpen = () => setFormIsOpen((prev) => !prev);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: formIsOpen,
		rootRef,
		onChange: setFormIsOpen,
	});

	const handleOnChange =
		(field: keyof typeof defaultArticleState) => (value: OptionType) => {
			setState((prevState) => {
				const newState = { ...prevState, [field]: value };
				return newState;
			});
		};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		const newStyle = {
			fontFamilyOption: state.fontFamilyOption,
			fontSizeOption: state.fontSizeOption,
			fontColor: state.fontColor,
			backgroundColor: state.backgroundColor,
			contentWidth: state.contentWidth,
		};
		onChange(newStyle);
	};

	const handleReset = (event: SyntheticEvent) => {
		event.preventDefault();
		setState(defaultArticleState);
		onChange(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={formIsOpen} onClick={toggleOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						align='left'
						family='open-sans'>
						{' '}
						Задайте параметры{' '}
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						onChange={handleOnChange('fontSizeOption')}
						selected={state.fontSizeOption}
						title='Размер'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						onChange={handleOnChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={handleOnChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						onChange={handleOnChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
