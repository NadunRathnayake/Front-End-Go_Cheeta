// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class AddVehicleTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void addVehicle() {
    driver.get("http://localhost:3000/Dashboard");
    driver.manage().window().setSize(new Dimension(1536, 738));
    driver.findElement(By.linkText("Vehicle")).click();
    driver.findElement(By.linkText("Add Vehicles")).click();
    driver.findElement(By.id("formBasicUserName")).click();
    driver.findElement(By.id("formBasicUserName")).sendKeys("BI-2292");
    driver.findElement(By.id("formBasicFirstName")).click();
    driver.findElement(By.id("formBasicFirstName")).sendKeys("Toyota");
    driver.findElement(By.cssSelector(".row:nth-child(2) > .col-lg-6:nth-child(1) .form-control")).click();
    driver.findElement(By.id("formBasicNumber")).click();
    driver.findElement(By.id("formBasicNumber")).sendKeys("B001");
    driver.findElement(By.cssSelector(".row:nth-child(3) #formBasicUserName")).click();
    driver.findElement(By.cssSelector(".row:nth-child(3) #formBasicUserName")).click();
    driver.findElement(By.cssSelector(".row:nth-child(3) #formBasicUserName")).sendKeys("DR001");
    driver.findElement(By.cssSelector(".btn-success")).click();
    js.executeScript("window.scrollTo(0,0)");
  }
}