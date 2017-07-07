CREATE MATERIALIZED VIEW cv_json3e AS(
	SELECT cv.report_id, 
	cv.cv_report,
	to_tsvector('english'::regconfig, (cv.cv_report)::text) AS search
	FROM( 
		SELECT r.report_id, jsonb_strip_nulls(jsonb_build_object(
			'report_id', r.report_id,
			'report_no', r.report_no,
			'version_no', r.version_no,
			'datreceived', r.datreceived,
			'datintreceived', r.datintreceived,
			'mah_no', NULLIF(r.mah_no, ''::text),
			'report_type_code', r.report_type_code,
			'report_type', r.report_type_eng,
			'gender_code', r.gender_code,
			'gender', NULLIF(r.gender_eng, ''::text),
			'age', r.age,
			'age_y', r.age_y,
			'age_unit', NULLIF(r.age_unit_eng, ''::text),
			'outcome_code', r.outcome_code,
			'outcome', r.outcome_eng,
			'weight', r.weight,
			'weight_unit', NULLIF(r.weight_unit_eng, ''::text),
			'height', r.height,
			'height_unit', NULLIF(r.height_unit_eng, ''::text),
			'seriousness_code', r.seriousness_code,
			'seriousness', r.seriousness_eng,
			'death', r.death,
			'disability', r.disability,
			'congenital_anomaly', r.congenital_anomaly,
			'life_threatening', r.life_threatening,
			'hosp_required', r.hosp_required,
			'reporter_type', NULLIF(r.reporter_type_eng, ''::text),
			'source_code', r.source_code,
			'source', NULLIF(r.source_eng, ''::text),
			'report_links', (
				SELECT jsonb_agg(to_jsonb(l.*)) 
				AS jsonb_agg 
				FROM(
					SELECT cv_report_links.report_link_id, 
						NULLIF(cv_report_links.record_type_eng, ''::text) AS record_type, 
						NULLIF(cv_report_links.report_link_no, ''::text) AS report_link_no
					FROM cv_report_links
					WHERE(cv_report_links.report_id=r.report_id))
			l),
			'report_drugs', (
				SELECT jsonb_agg(to_jsonb(rd.*))
				AS jsonb_agg
				FROM(
					SELECT cv_report_drug.report_drug_id, 
						cv_report_drug.drug_product_id, 
						cv_report_drug.drugname, 
						(cv_report_drug.druginvolv_eng) AS druginvolv,
						(cv_report_drug.dosageform_eng) AS dosageform,
						(SELECT jsonb_agg(to_jsonb(ing.*))
						AS jsonb_agg
						FROM(
							SELECT cv_drug_product_ingredients.drug_product_ingredient_id,
								cv_drug_product_ingredients.active_ingredient_id,
								cv_drug_product_ingredients.active_ingredient_name
							FROM cv_drug_product_ingredients
							WHERE (cv_drug_product_ingredients.drug_product_id=cv_report_drug.drug_product_id))
						ing)
						AS ingredients
					FROM cv_report_drug
					WHERE(cv_report_drug.report_id=r.report_id))
			rd),
			'report_drug_indication', (
				SELECT jsonb_agg(to_jsonb(di.*))
				AS jsonb_agg
				FROM(
					SELECT cv_report_drug_indication.report_drug_id,
						cv_report_drug_indication.drug_product_id,
						cv_report_drug_indication.drugname,
						NULLIF(cv_report_drug_indication.indication_name_eng, ''::text) AS indication_name
					FROM cv_report_drug_indication
					WHERE(cv_report_drug_indication.report_id=r.report_id))
			di),
			'reactions', (
				SELECT jsonb_agg(to_jsonb(reac.*))
				AS jsonb_agg
				FROM(
					SELECT cv_reactions.reaction_id,
						NULLIF(cv_reactions.pt_name_eng, ''::text) AS pt_name,
						NULLIF(cv_reactions.soc_name_eng, ''::text) AS soc_name,
						NULLIF(cv_reactions.meddra_version, ''::text) AS meddra_version
					FROM cv_reactions
					WHERE(cv_reactions.report_id=r.report_id))
			reac)
			)) 
		AS cv_report
		FROM cv_reports r)
	cv
);

