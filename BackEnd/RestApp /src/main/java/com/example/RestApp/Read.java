package com.example.RestApp;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

public class Read {

    public Read(){

    }



    public  Dataset<Row>    read(String Doc){

        //Create a SparkContext to initialize
        SparkConf conf = new SparkConf().setMaster("local").setAppName("Word Count");

        // Create a Java version of the Spark Context
        JavaSparkContext sc = new JavaSparkContext(conf);
        SparkSession spark = SparkSession
                .builder()
                .appName("Java Spark SQL basic example")
                .config("spark.some.config.option", "some-value")
                .getOrCreate();

        // Load the text into a Spark RDD, which is a distributed representation of each line of text
//        JavaRDD<String> textFile = sc.textFile("hdfs:///shakespeare.txt");
//        JavaPairRDD<String, Integer> counts = textFile
//                .flatMap(s -> Arrays.asList(s.split("[ ,]")).iterator())
//                .mapToPair(word -> new Tuple2<>(word, 1))
//                .reduceByKey((a, b) -> a + b);
//        counts.foreach(p -> System.out.println(p));
//        System.out.println("Total words: " + counts.count());
//        counts.saveAsTextFile("/home/houssem/Bureau/shakespeareWordCount.txt");
        Dataset<Row> df = spark.read().option("header", "true").option("delimiter", ";").csv(Doc);
        return  df;

    }


    public void    select ( Dataset<Row> df, String S  ){
        df.select(S).show();

    }

    public void    GroupBy ( Dataset<Row> df, String S  ){
        df.groupBy(S).count().show();

    }
    public void toSQL (Dataset<Row> df, String S, String SQLTEXT){


        df.createOrReplaceTempView(S);
        SparkSession spark = SparkSession
                .builder()
                .appName("Java Spark SQL basic example")
                .config("spark.some.config.option", "some-value")
                .getOrCreate();
        Dataset<Row> sqlDF = spark.sql(SQLTEXT);
        sqlDF.show();
    }
    public Dataset<Row> Combine(Dataset<Row>df1,String S1,Dataset<Row> df2, String S2){
        return df1.join(df2, df1.col(S1).equalTo(df2.col(S2)));
    }
}

