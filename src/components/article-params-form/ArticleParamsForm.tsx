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
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	onChange: (newStyle: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [formIsOpen, setFormIsOpen] = useState(false);
	const [selectedFontSizeOption, setSelectedFontSizeOption] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontFamilyOption, setSelectedFontFamilyOption] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontColorsOption, setSelectedFontColorsOption] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColorsOption, setSelectedBackgroundColorsOption] =
		useState(defaultArticleState.backgroundColor);
	const [selectedContentWidthArrOption, setSelectedContentWidthArrOption] =
		useState(defaultArticleState.contentWidth);

	const toggleOpen = () => setFormIsOpen((prev) => !prev);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: formIsOpen,
		rootRef,
		onChange: setFormIsOpen,
	});

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		const newStyle = {
			fontFamilyOption: selectedFontFamilyOption,
			fontSizeOption: selectedFontSizeOption,
			fontColor: selectedFontColorsOption,
			backgroundColor: selectedBackgroundColorsOption,
			contentWidth: selectedContentWidthArrOption,
		};
		onChange(newStyle);
	};

	const handleReset = (event: SyntheticEvent) => {
		event.preventDefault();
		setSelectedFontFamilyOption(defaultArticleState.fontFamilyOption);
		setSelectedFontSizeOption(defaultArticleState.fontSizeOption);
		setSelectedFontColorsOption(defaultArticleState.fontColor);
		setSelectedBackgroundColorsOption(defaultArticleState.backgroundColor);
		setSelectedContentWidthArrOption(defaultArticleState.contentWidth);
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
						selected={selectedFontFamilyOption}
						options={fontFamilyOptions}
						onChange={setSelectedFontFamilyOption}
						title='Шрифт'></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						onChange={setSelectedFontSizeOption}
						selected={selectedFontSizeOption}
						title='Размер'></RadioGroup>
					<Select
						selected={selectedFontColorsOption}
						options={fontColors}
						onChange={setSelectedFontColorsOption}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						selected={selectedBackgroundColorsOption}
						options={backgroundColors}
						onChange={setSelectedBackgroundColorsOption}
						title='Цвет фона'></Select>
					<Select
						selected={selectedContentWidthArrOption}
						options={contentWidthArr}
						onChange={setSelectedContentWidthArrOption}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
