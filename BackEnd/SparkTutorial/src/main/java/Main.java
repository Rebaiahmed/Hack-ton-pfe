
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.SparkConf;
import scala.Tuple2;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {

//        //Create a SparkContext to initialize
//        SparkConf conf = new SparkConf().setMaster("local").setAppName("Word Count");
//
//        // Create a Java version of the Spark Context
//        JavaSparkContext sc = new JavaSparkContext(conf);
//        SparkSession spark = SparkSession
//                .builder()
//                .appName("Java Spark SQL basic example")
//                .config("spark.some.config.option", "some-value")
//                .getOrCreate();
//
//        // Load the text into a Spark RDD, which is a distributed representation of each line of text
////        JavaRDD<String> textFile = sc.textFile("hdfs:///shakespeare.txt");
////        JavaPairRDD<String, Integer> counts = textFile
////                .flatMap(s -> Arrays.asList(s.split("[ ,]")).iterator())
////                .mapToPair(word -> new Tuple2<>(word, 1))
////                .reduceByKey((a, b) -> a + b);
////        counts.foreach(p -> System.out.println(p));
////        System.out.println("Total words: " + counts.count());
////        counts.saveAsTextFile("/home/houssem/Bureau/shakespeareWordCount.txt");
//        Dataset<Row> df = spark.read().option("header", "true").option("delimiter", ";").csv("src/main/resources/KoreaPolicyFile100k.csv");
//        df.printSchema();

        Hortonworks.SparkTutorial.Read R =new Hortonworks.SparkTutorial.Read();
        Dataset<Row>  df = R.read("src/main/resources/StudyID_6_Korea3.csv");
        df.printSchema();
//        R.select(df,"Age_at_Commencement");
//        R.GroupBy(df,"Age_at_Commencement");
//        R.toSQL(df,"people","SELECT * FROM people");
//        Dataset<Row> df1 = R.Combine(df,"Policy_ID",df,"Benefit_ID");
//        df1.printSchema();

    }

}