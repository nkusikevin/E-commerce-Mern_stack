import React from 'react'
import {Helmet} from "react-helmet"
function Meta({title ,description,keywords}) {
    return (
			<>
				<Helmet>
					<title>{title}</title>
					<meta
						name='description'
						content={description}
					/>
					<meta
						name='keywords'
						content={keywords}
					/>
				</Helmet>
			</>
		);
}

Meta.defaultProps = {
	title: " Welcome to EndlineShop",
	description: "We sell The Best Electronic Product",
	keywords: "electronics , buy electronics ,cheap",
};

export default Meta
