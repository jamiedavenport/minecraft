package config

import (
	"strings"

	"github.com/spf13/viper"
)

func Init() {
	viper.AutomaticEnv()
	viper.SetEnvPrefix("minecraft")
	viper.SetEnvKeyReplacer(strings.NewReplacer("-", "_"))
}
