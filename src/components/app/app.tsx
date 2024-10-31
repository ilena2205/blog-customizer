import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';

export const App = () => {
	const [currentStyle, setCurrentStyle] = useState(defaultArticleState);

	const handleChange = (newStyle: typeof defaultArticleState) => {
		setCurrentStyle(newStyle);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentStyle.fontFamilyOption.value,
					'--font-size': currentStyle.fontSizeOption.value,
					'--font-color': currentStyle.fontColor.value,
					'--container-width': currentStyle.contentWidth.value,
					'--bg-color': currentStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={handleChange} />
			<Article />
		</main>
	);
};
