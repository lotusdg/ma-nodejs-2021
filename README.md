Node.js 2021

for DB:

CREATE TABLE public.products (
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	item varchar NULL,
	"type" varchar NULL,
	measure varchar NULL,
	measurevalue float4 NULL,
	pricetype varchar NULL,
	pricevalue varchar NULL,
	createdate timestamp NULL,
	datelastchange timestamp NULL,
	deletedate timestamp NULL
);
