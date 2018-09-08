package com.qrscanning.shanematte;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.cboy.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    protected void onCreate(Bundle savedInstanceState) {

		SplashScreen.show(this);

        super.onCreate(savedInstanceState);

    }

    @Override
    protected String getMainComponentName() {
        return "qrscanning";
    }
}
