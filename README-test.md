* __mf README-test__
<br>Assumes cygwin bash console on windows.


* [1] test/components/producer-component.e2e.spec is a set of 
end-to-end tests exercising the actual running services backend 
(genotype-service and phenotype-service)

* to run start the services backend (with no associated producers)
use argv[2] = '0' which causes no node producers to be created
<br>[1a] mf$> ```node index 0```
<br>(Otherwise argv[2] is the producer send period with default 10000ms - see README)

* Then run the e2e test
<br>[1b] mf$> ```bash test-e2e.sh```
<br>NOTE: the last test run generates a report in ```test/e2e/reports```
<br><br>



* [2] unit test for genotype using phenotype-service-mock
* NOTE: do NOT run ```node index``` since it will cause port conflict!
<br>mf$> ```bash test-unit-genotype.sh```
<br>NOTE: the last test run generates a report in ```test/unit/genotype/reports```
<br><br>


* [3] unit test for phenotype-service using genotype-service-mock
* NOTE: do NOT run ```node index``` since it will cause port conflict!
<br>mf$> ```bash test-unit-phenotype.sh```
<br>NOTE: the last test run generates a report in ```test/unit/phenotype/reports```
