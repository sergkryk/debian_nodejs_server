/* SELECT id, name FROM tarif_plans WHERE month_fee > 0; */

SELECT uid FROM dv_main WHERE tp_id IN (SELECT id FROM tarif_plans WHERE month_fee > 0);