package com.example.RestApp;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.RelationalGroupedDataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")

@RestController

public class Df {

    @RequestMapping( value= "/dev", method = RequestMethod.POST)

    public List<String> Aw () throws IOException {
        SparkConf conf = new SparkConf().setMaster("local").setAppName("Word Count");
        conf.set("spark.driver.allowMultipleContexts", "true");
        // Create a Java version of the Spark Context
        JavaSparkContext sc = new JavaSparkContext(conf);
        SparkSession spark = SparkSession
                .builder()
                .appName("Java Spark SQL basic example")
                .config("spark.some.config.option", "some-value")
                .getOrCreate();
     //   sc.driver.allowMultipleContexts = true;

//        val jsonSchema = new StructType()
//                .add("Run_id", StringType)
//                .add("Decrement_id", StringType)
//                .add("Decrement", StringType)
//                .add("AGE_AT_COMMENCEMENT" , StringType)
//                .add("MAIN_RISK_TYPE", StringType)
//                .add("ACCELERATION_RISK_TYPE", StringType)
//                .add("GENDER", StringType)
//                .add("SMOKER_STATUS", StringType)
//                .add("RATED_STATUS", StringType)
//                .add("JOINT_LIFE_TYPE", StringType)
//                .add("DISTRIBUTION_CHANNEL", StringType)
//                .add("UNDERWRITING_METHOD", StringType)
//                .add("EMPLOYMENT_STATUS", StringType)
//                .add("BUSINESS_AREA", StringType)
//                .add("TYPE_OF_POLICY", StringType)
//                .add("FACE_AMOUNT_BAND_SCOR", StringType)
//                .add("cal_year", StringType)
//                .add("AGE_ATTAINED", StringType)
//                .add("duration_Year", StringType)
//                .add("PartialExp", StringType)
//                .add("Actual_Count", StringType)
//                .add("Exposure_Count_Central", StringType)
//                .add("Actual_amount", StringType)
//                .add("Exposure_Amount_central", StringType)
//                .add("Client_Risk_Carrier_Name", StringType)
//                .add("CLIENT_GROUP", StringType)
//                .add("CLIENT_SEGMENTATION", StringType)
//                .add("CLIENT_CODE", StringType)
//                .add("CLIENT_COUNTRY", StringType)
//                .add("CURRENCY", StringType)
//                .add("GENDER_DIFFERENTIATION", StringType)
//                .add("Smoker_differentiation", StringType)
//                .add("LEGAL_ENTITY", StringType)
//                .add("AGE_DEFINITION", StringType)
//                .add("PRODUCT_TYPE", StringType)
//                .add("Dependent_type", StringType)
//                .add("Marital_Status", StringType)
//                .add("Country_of_Residence", StringType)
//                .add("Benefit_Term_Type", StringType)
//                .add("Benefit_Max_Age", StringType);


        Dataset<Row> df = spark.read().option("header", "true").option("delimiter", ";").csv("src/main/resources/KoreaPolicyFile100k.csv");
        long N = df.count();
        String strLong = Long.toString(N);
        //df.toJSON.saveAsTextFile("/tmp/jsonRecords");




        Dataset<Row> df1=df.select("Gender");
        HashMap<String,String> map = new HashMap<>();
        map.put("Key","Value");
       // df.select("Gender","AGE_AT_COMMENCEMENT").toJSON().collectAsList();

        return df.select("Gender","AGE_AT_COMMENCEMENT").toJSON().collectAsList();


//        df.printSchema();
//        df.select("Gender").write()
//                .format("com.databricks.spark.csv")
//                .option("header", "true")
//                .option("codec", "org.apache.hadoop.io.compress.GzipCodec")
//                .save("newcars.csv");

//        try {
//            File file=new File("JsonFile.json");
//            file.createNewFile();
//            FileWriter fileWriter = new FileWriter(file);
//            System.out.println("Writing JSON object to file");
//            System.out.println("-----------------------");
////        System.out.print("");
//
//
//            fileWriter.write(String.valueOf(df.toJSON()));
//            fileWriter.flush();
//            fileWriter.close();
//            System.out.println(df.toJSON().toString());
//        }
//        catch (IOException e) {
//           System.out.println("Shitiiiittittitit");
//        }
     //   df.toJSON().collect().
       // return df.schema.json();
//        StructType jasonschema = df.schema();
//        JSONArray array = new JSONArray();
//        JSONObject json = new JSONObject();
     //  return "hahaha";

    }

    @RequestMapping( value= "/dev2", method = RequestMethod.POST)
    public List<String>toSQL () {
        SparkConf conf = new SparkConf().setMaster("local").setAppName("Word Count");
        conf.set("spark.driver.allowMultipleContexts", "true");
        // Create a Java version of the Spark Context
        JavaSparkContext sc = new JavaSparkContext(conf);
        SparkSession spark = SparkSession
                .builder()
                .appName("Java Spark SQL basic example")
                .config("spark.some.config.option", "some-value")
                .getOrCreate();
        Dataset<Row> df = spark.read().option("header", "true").option("delimiter", ";").csv("src/main/resources/KoreaPolicyFile100k.csv");
        df.createOrReplaceTempView("data");
        Dataset<Row> sqlDF = spark.sql("SELECT * FROM data");

        return sqlDF.toJSON().collectAsList();

    }
}
