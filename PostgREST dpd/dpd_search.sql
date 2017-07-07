CREATE MATERIALIZED VIEW dpd_search AS(
	SELECT drug_product.brand_name, companies.company_name, active_ingredient.ingredient 
	FROM drug_product NATURAL JOIN companies NATURAL JOIN active_ingredient
);